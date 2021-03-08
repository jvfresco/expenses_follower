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
import {useQueryClient } from 'react-query'
import {useAuth} from './context/auth-context'

function App(props) {
  const {user} = useAuth()
  //TODO: SET AND OBTAIN THEME FROM STORAGE IF EXISTS
  useLayoutEffect(() => {
    document.body.dataset.theme = 'light'
  }, [])

  return (
    user 
    ?
    <div css={{display:'flex'}}>
      <Navbar/>
      <div css={{width: '100%', textAlign:'center', backgroundColor:'var(--colors-background)'}}>
      <Switch>
        
          <Route path="/global" exact>
            <GlobalView {...props} />
          </Route>
          <Route path="/expenses" exact>
            <ExpensesPage {...props}/>
          </Route>
          <Route path="/accounts" exact>
            <AccountsPage {...props}/>
          </Route>
          <Route path="/expense-categories" exact>
            <CategoriesPage {...props} purpose='expense'/>
          </Route>
          <Route path="/income-categories" exact>
            <CategoriesPage {...props} purpose='income'/>
          </Route>
          <Route path="/payment-types" exact>
            <CategoriesPage {...props} purpose=''/>
          </Route>
          <Route path="/collection-types" exact>
            <CategoriesPage {...props} purpose=''/>
          </Route>
        
      </Switch>
      </div>
    </div>
    :
    <Auth/>
  ) 
}

export default App;
