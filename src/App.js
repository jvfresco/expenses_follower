import Navbar from './components/Navigation/Navbar'
import styled from '@emotion/styled/macro'
import { Switch, Route} from 'react-router-dom'
import { useLayoutEffect, useReducer } from 'react'
import GlobalView from './pages/GlobalView/GlobalView'
import Auth from './pages/Auth/Auth'
import ExpensesPage from './pages/Expenses/ExpensesPage'
import AccountsPage from './pages/Accounts/AccountsPage'
import CategoriesPage from './pages/Categories/CategoriesPage'

const Container = styled.div({
  display: "flex"
})

const reducer = (state, action) => {
  switch (action.type){
    case 'AUTH_USER': 
    return {...state, isAuth: true, token: action.token, userId: action.userId}
    case 'LOGOUT_HANDLER':
      return {...state, isAuth: false, token: null}
    case 'AUTH_LOADING':
      return {...state, authLoading: true}
    case 'LOGIN_SUCCESS':
      return {...state, isAuth: true, token: action.token, authLoading: false, userId: action.userId}
    case 'LOGIN_ERROR':
      return {...state, isAuth: false, authLoading: false, error: action.err}
    case 'SIGNUP_SUCCESS':
      return {...state, isAuth: false, authLoading: false}
    case 'SIGNUP_ERROR':
      return {...state, isAuth: false, authLoading: false, error: action.err}
    case 'ERROR':
      return {...state, error: null}
    default:
      return null
  }
}

function App(props) {

  const [state, dispatch] = useReducer(reducer, {
    isAuth: false,
    token: null,
    userId: null,
    authLoading: false,
    error: null,
  });

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    dispatch({type: 'AUTH_USER', token, userId})
    setAutoLogout(remainingMilliseconds);
  },[])

  const loginHandler = async (authData) => {
    dispatch({type:'AUTH_LOADING'})
    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: authData.email,
          password: authData.password
        }),
      });
      if (res.status === 422) {
        throw new Error("Validation failed.");
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log("Error!");
        throw new Error("Could not authenticate you!");
      }
      const resData = await res.json();
      dispatch({type:'LOGIN_SUCCESS', token: resData.token,userId: resData.userId,})
      localStorage.setItem("token", resData.token);
      localStorage.setItem("userId", resData.userId);
      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem("expiryDate", expiryDate.toISOString());
      setAutoLogout(remainingMilliseconds);
    } catch (err) {
      console.log(err);
      dispatch({type:'LOGIN_ERROR', err})
    }
  };

  const signupHandler = async (authData) => {
    dispatch({type:'AUTH_LOADING'})
    try {
      const res = await fetch("http://localhost:8080/auth/signup", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: authData.email,
          password: authData.password,
          name: authData.name,
        }),
      });
      if (res.status === 422) {
        throw new Error(
          "Validation failed. Make sure the email address isn't used yet!"
        );
      }
      if (res.status !== 200 && res.status !== 201) {
        console.log("Error!");
        throw new Error("Creating a user failed!");
      }
      const resData = await res.json();
      dispatch({type:'SIGNUP_SUCCESS'})
      props.history.replace("/");
    } catch (err) {
      console.log(err);
      dispatch({type:'SIGNUP_ERROR', err})
    }
  };

  //TODO: REDIRECTION TO LOGIN AFTER LOGOUT
  const logoutHandler = () => {
    dispatch({type: 'LOGOUT_HANDLER'})
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  const setAutoLogout = (milliseconds) => {
    //TODO: REDIRECT TO LOGIN, LOGOUT IF NO ACTIVITY, DISPLAY INFO MESSAGE
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };


  return (
    <Container>
      <Navbar onLogout={logoutHandler} isAuth={state.isAuth} />

      {state.isAuth ? (
        <Switch>
          <Route path="/" exact render={(props) => <GlobalView {...props} />} />
          <Route path="/expenses" exact render={(props) => <ExpensesPage {...props} userId={state.userId} token={state.token}/>} />
          <Route path="/accounts" exact render={(props) => <AccountsPage {...props} userId={state.userId} token={state.token}/>} />
          <Route path="/categories" exact render={(props) => <CategoriesPage {...props} userId={state.userId} token={state.token} purpose='expense'/>} />
        </Switch>
      ) : (
        <Auth
          loading={state.authLoading}
          loginHandler={loginHandler}
          signupHandler={signupHandler}
        />
      )}
    </Container>
  );
}

export default App;
