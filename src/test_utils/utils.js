import AuthProviders from '../context/index'
import {render as rtlRender} from '@testing-library/react'

function render(component, {...options} = {}){
    function Wrapper({children}){
      return (
       <AuthProviders>
         {children}
       </AuthProviders>
      )
    }  
    return rtlRender(component, {wrapper: Wrapper, ...options}) 
}

export * from '@testing-library/react'
export {render}