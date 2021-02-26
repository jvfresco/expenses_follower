import {BrowserRouter} from 'react-router-dom'
import {IntlProvider} from 'react-intl'
import {render as rtlRender} from '@testing-library/react'
import en from '../translations/en.json'

function render(component, {...options} = {}){
    function Wrapper({children}){
      return(
      <BrowserRouter>
          <IntlProvider locale="en" messages={en}>
            {children}
          </IntlProvider>
        </BrowserRouter>
      )
    }  
    return rtlRender(component, {wrapper: Wrapper, ...options}) 
}

export * from '@testing-library/react'
export {render}