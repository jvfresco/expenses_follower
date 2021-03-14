/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import Navbar from './components/Navigation/Navbar'
import { Switch, Route} from 'react-router-dom'
import { useLayoutEffect} from 'react'
import GlobalView from './pages/GlobalView/GlobalView'
import Auth from './pages/Auth/Auth'
import ExpensesPage from './pages/Expenses/ExpensesPage'
import AccountsPage from './pages/Accounts/AccountsPage'
import CategoriesPage from './pages/Categories/CategoriesPage'
import {useAuth} from './context/auth-context'
import * as ENDPOINTS from './routes/endpoints'
import { ErrorBoundary } from 'react-error-boundary'
import {ErrorComponent} from './components/Error/ErrorComponent'

function App(props) {
  const {user} = useAuth()
  //TODO: SET AND OBTAIN THEME FROM STORAGE IF EXISTS
  useLayoutEffect(() => {
    document.body.dataset.theme = 'light'
  }, [])

  const AppRoutes = () => (
    <Switch>
          <Route path={ENDPOINTS.GLOBAL} exact>
            <GlobalView {...props} />
          </Route>
          <Route path={ENDPOINTS.EXPENSES} exact>
            <ExpensesPage {...props}/>
          </Route>
          <Route path={ENDPOINTS.INCOMES} exact>
            {/* TODO INCOMES PAGE */}
          </Route>
          <Route path={ENDPOINTS.ACCOUNTS} exact>
            <AccountsPage {...props}/>
          </Route>
          <Route path={ENDPOINTS.EXPENSE} exact>
            <CategoriesPage {...props} />
          </Route>
          <Route path={ENDPOINTS.INCOME} exact>
            <CategoriesPage {...props} />
          </Route>
          <Route path={ENDPOINTS.PAYMENT} exact>
            <CategoriesPage {...props} />
          </Route>
          <Route path={ENDPOINTS.COLLECTION} exact>
            <CategoriesPage {...props} />
          </Route>
        
      </Switch>
  )
  return (
    user 
    ?
    <div css={{display:'flex'}}>
      <Navbar/>
      <div css={{width: '100%', textAlign:'center', backgroundColor:'var(--colors-background)'}}>
      <ErrorBoundary FallbackComponent={ErrorComponent}>
        <AppRoutes/>
      </ErrorBoundary>
      </div>
    </div>
    :
    <Auth/>
  ) 
}

export default App;
