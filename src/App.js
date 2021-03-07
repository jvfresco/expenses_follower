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
    history.push('/global')
  },[setData, history]);
  
  useLayoutEffect(() => {
    run(auth_provider.getUser(logoutHandler))
  },[run, logoutHandler])

  //TODO: SET AND OBTAIN THEME FROM STORAGE IF EXISTS
  useLayoutEffect(() => {
    document.body.dataset.theme = 'light'
  }, [])


  const login = authData => auth_provider.login(authData, logoutHandler).then(user => {
    setData(user)
    history.push('/global')
  })

  const signup = authData => auth_provider.signup(authData).then(response => {
    history.push('/global')
  })

  return (
    user 
    ?
    <div css={{display:'flex'}}>
      <Navbar onLogout={logoutHandler}/>
      <Switch>
        <div css={{width: '100%', textAlign:'center', backgroundColor:'var(--colors-background)'}}>
          <Route path="/global" exact>
            <GlobalView {...props} />
          </Route>
          <Route path="/expenses" exact>
            <ExpensesPage {...props} userId={user.userId} token={user.token}/>
          </Route>
          <Route path="/accounts" exact>
            <AccountsPage {...props} userId={user.userId} token={user.token}/>
          </Route>
          <Route path="/expense-categories" exact>
            <CategoriesPage {...props} userId={user.userId} token={user.token} purpose='expense'/>
          </Route>
          <Route path="/income-categories" exact>
            <CategoriesPage {...props} userId={user.userId} token={user.token} purpose='income'/>
          </Route>
          <Route path="/payment-types" exact>
            <CategoriesPage {...props} userId={user.userId} token={user.token} purpose=''/>
          </Route>
          <Route path="/collection-types" exact>
            <CategoriesPage {...props} userId={user.userId} token={user.token} purpose=''/>
          </Route>
        </div>
      </Switch>
    </div>
    :
    <Auth loginHandler={login} signupHandler={signup}/>
    
    );
}

export default App;
