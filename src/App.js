/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import Navbar from './components/Navigation/Navbar'
import { Switch, Route, useHistory} from 'react-router-dom'
import { useLayoutEffect, useCallback } from 'react'
import GlobalView from './pages/GlobalView/GlobalView'
import Auth from './pages/Auth/Auth'
import ExpensesPage from './pages/Expenses/ExpensesPage'
import AccountsPage from './pages/Accounts/AccountsPage'
import CategoriesPage from './pages/Categories/CategoriesPage'
import * as auth_provider from './auth-provider'
import { useAsync } from './utils/hooks'

function App(props) {
  const {data: user, run, isLoading, isError, isSuccess, setData} = useAsync()
  let history = useHistory();
  const logoutHandler = useCallback(() => {
    setData(null)
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  },[setData]);
  
  useLayoutEffect(() => {
    console.log('run')
    run(auth_provider.getUser(logoutHandler))
  },[run, logoutHandler])


  const login = authData => auth_provider.login(authData).then(user => {
    setData(user)
    history.push('/global')
  })

  const signup = authData => auth_provider.signup(authData).then(response => {
    history.push('/')
  })

  return (
    <div css={{display:'flex'}}>
      <Navbar onLogout={logoutHandler}/>
      {user ? (
        <Switch>
          <Route path="/global" exact render={(props) => <GlobalView {...props} />} />
          <Route path="/expenses" exact render={(props) => <ExpensesPage {...props} userId={user.userId} token={user.token}/>} />
          <Route path="/accounts" exact render={(props) => <AccountsPage {...props} userId={user.userId} token={user.token}/>} />
          <Route path="/categories" exact render={(props) => <CategoriesPage {...props} userId={user.userId} token={user.token} purpose='expense'/>} />
        </Switch>
      ) : (
        <Auth
          loginHandler={login}
          signupHandler={signup}
        />
      )}
    </div>
  );
}

export default App;
