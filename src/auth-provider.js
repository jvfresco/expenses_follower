
const AUTH_URL = 'http://localhost:8080/auth/'

function handleUserResponse({token, userId}){
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem("expiryDate", expiryDate.toISOString());
    //setAutoLogout(remainingMilliseconds);
    return {token, userId}
}

function login({email, password}) {
    return client('login', {email, password}).then(handleUserResponse)
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

  export {login, signup}