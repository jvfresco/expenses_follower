import React from 'react'
import Login from './Login.js'
import Signup from './Signup'
import { Switch, Route } from 'react-router-dom'
import {Fragment} from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Backdrop from '../../components/UI/Backdrop/Backdrop'
import { useAsync } from '../../utils/hooks.js'



const Auth = ({loginHandler, signupHandler}) => {
    const {run, isLoading, isError, isSuccess} = useAsync()

    const handleLogin = (authData) => {
      run(loginHandler(authData))
    }

    const handleSignup = (authData) => {
      run(signupHandler(authData))
    }

    return (
        <Fragment>
        <Backdrop />
        <Modal title={"EXPENSES FOLLOWER"}>
          <Switch>
          <Route
              path="/signup"
              exact
              render={(props) => (
                <Signup
                  {...props}
                  isLoading={isLoading}
                  isError={isError}
                  isSuccess={isSuccess}
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
                  isSuccess={isSuccess}
                  onSubmit={handleLogin}
                />
              )}
            />
          </Switch>
        </Modal>
      </Fragment>
    )
}

export default Auth