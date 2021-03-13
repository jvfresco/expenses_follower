const AUTH_URL = 'http://localhost:8080/auth/'

async function getUser() {
  let user = null
  const token = localStorage.getItem("token");
  const expiryDate = localStorage.getItem("expiryDate");
  if (!token || !expiryDate) {
    return user;
  }
  if (new Date(expiryDate) <= new Date()) {
    logout();
    return user;
  }
  const userId = localStorage.getItem("userId");
  const remainingMilliseconds =
    new Date(expiryDate).getTime() - new Date().getTime();
  return { token, userId, remainingMilliseconds };
}

async function setAutoLogout(logoutHandler, miliseconds){
  const remainingMilliseconds = miliseconds ? miliseconds : 60 * 60 * 1000;
  const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
  localStorage.setItem("expiryDate", expiryDate.toISOString());
  setTimeout(() => {
    logoutHandler();
  }, remainingMilliseconds);
}

function handleUserResponse({token, userId}){
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    return {token, userId}
}

async function login({email, password}) {
    return client('login', {email, password}).then(res => handleUserResponse(res))
}

function signup({email, password, name}) {
    return client('signup', {email, password, name})
}

async function client(endpoint, data) {
    const config = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'},
    }
  
    return window.fetch(AUTH_URL + endpoint, config).then(async response => {
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
  }

  async function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  }

  export {login, signup, getUser, logout, setAutoLogout}