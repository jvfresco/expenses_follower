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
import * as CATEGORY from './pages/Categories/category_types'

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
          <Route path={CATEGORY.EXPENSE} exact>
            <CategoriesPage {...props} type={CATEGORY.EXPENSE}/>
          </Route>
          <Route path={CATEGORY.INCOME} exact>
            <CategoriesPage {...props} type={CATEGORY.INCOME}/>
          </Route>
          <Route path={CATEGORY.PAYMENT} exact>
            <CategoriesPage {...props} type={CATEGORY.PAYMENT} />
          </Route>
          <Route path={CATEGORY.COLLECTION} exact>
            <CategoriesPage {...props} type={CATEGORY.COLLECTION}/>
          </Route>
        
      </Switch>
      </div>
    </div>
    :
    <Auth/>
  ) 
}

export default App;
