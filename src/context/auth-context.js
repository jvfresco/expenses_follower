
import {useAsync} from '../utils/hooks'
import {useHistory} from 'react-router-dom'
import {useQueryClient} from 'react-query'
import React, {useCallback, useMemo, useLayoutEffect} from 'react'
import * as auth_provider from '../auth-provider'
import { client } from '../utils/api-client'

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

const userPromise = auth_provider.getUser() //TODO: fetch global data here if there is a user

const AuthProvider = (props) => {
    const {data: user, run, isLoading, isError, isSuccess, isIdle, setData} = useAsync()
    let history = useHistory();
    const queryClient = useQueryClient()
    
    const logout = useCallback(() => {
        auth_provider.logout()
        setData(null)
        history.push('/global')
        queryClient.clear()
    },[history, queryClient, setData])

    useLayoutEffect(() => {
        run(userPromise)
    },[run])

    const login = useCallback((authData)=> auth_provider.login(authData).then(user => {
        setData(user)
        history.push('/global')
    }),[history, setData]) 
    
    const signup = useCallback((authData)=> auth_provider.signup(authData).then(response => {
        history.push('/global')
    }),[history]) 

    const value = useMemo(() => ({user, login, signup, logout}),[login, logout, signup, user])

    if(isLoading || isIdle){
        return <div>loading</div>
    }
    if(isError){
        return <div>error</div>
    }

    if(isSuccess){
        auth_provider.setAutoLogout(logout, user?.remainingMilliseconds)
        return <AuthContext.Provider value={value} {...props} />
    }

    throw new Error(`Unhandled status`)
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