
import {useAsync} from '../utils/hooks'
import {useHistory} from 'react-router-dom'
import {useQueryClient} from 'react-query'
import React, {useCallback, useLayoutEffect} from 'react'
import * as auth_provider from '../auth-provider'
import { client } from '../utils/api-client'

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

const AuthProvider = (props) => {
    const {data: user, run, isLoading, isError, isSuccess, setData} = useAsync()
    let history = useHistory();
    const queryClient = useQueryClient()
    const logoutHandler = useCallback(() => {
        setData(null)
        localStorage.removeItem("token");
        localStorage.removeItem("expiryDate");
        localStorage.removeItem("userId");
        history.push('/global')
        queryClient.clear()
    },[setData, history, queryClient]);
    
    useLayoutEffect(() => {
        run(auth_provider.getUser(logoutHandler))
    },[run, logoutHandler])

    const login = authData => auth_provider.login(authData, logoutHandler).then(user => {
        setData(user)
        history.push('/global')
    })
    
    const signup = authData => auth_provider.signup(authData).then(response => {
        history.push('/global')
    })

    const value = {user, login, signup, logoutHandler}

    return <AuthContext.Provider value={value} {...props} />
}


const useAuth = () => {
    const context = React.useContext(AuthContext)
    if(context === undefined){
        throw new Error('useAuth must be used with an AuthContext Provider')
    }
    return context
}

const useClient = () => {
    const {user: {token}} = useAuth()
    return React.useCallback((endpoint, config) => 
        client(endpoint,{...config, token} )
    ,[token])
}

export {useClient, useAuth, AuthProvider}