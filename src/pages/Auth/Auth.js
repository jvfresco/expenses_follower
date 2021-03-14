import React from 'react'
import Login from './Login.js'
import Signup from './Signup'
import { Switch, Route } from 'react-router-dom'
import {Fragment} from 'react'
import {Modal, ModalTitle, ModalContent} from '../../components/UI/Modal/Modal'
import Backdrop from '../../components/UI/Backdrop/Backdrop'
import { useAsync } from '../../utils/hooks.js'
import {useAuth} from '../../context/auth-context'


const Auth = () => {
    const {run, isLoading, isError, error} = useAsync()
    const {login, signup} = useAuth()
    const handleLogin = (authData) => {
      run(login(authData))
    }

    const handleSignup = (authData) => {
      run(signup(authData))
    }

    return (
        <Fragment>
        <Backdrop />
        <Modal>
          <ModalTitle title={"EXPENSES FOLLOWER"}/>
            <ModalContent>
              <Switch>
              <Route
                  path="/signup"
                  exact
                  render={(props) => (
                    <Signup
                      {...props}
                      isLoading={isLoading}
                      isError={isError}
                      error={error}
                      onSubmit={handleSignup}
                    />
                  )}
                />
                <Route
                  path="/global"
                  exact
                  render={(props) => (
                    <Login
                      {...props}
                      isLoading={isLoading}
                      isError={isError}
                      error={error}
                      onSubmit={handleLogin}
                    />
                  )}
                />
              </Switch>
            </ModalContent>
        </Modal>
      </Fragment>
    )
}

export default Auth