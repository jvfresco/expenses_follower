import React from 'react'
import Login from './Login.js'
import Signup from './Signup'
import { Switch, Route } from 'react-router-dom'
import {Fragment} from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Backdrop from '../../components/UI/Backdrop/Backdrop'



const Auth = ({loginHandler, signupHandler, loading}) => {

    
    return (
        <Fragment>
        <Backdrop />
        <Modal title={"LOGIN"}>
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <Login
                  {...props}
                  onSubmit={loginHandler}
                  loading={loading}
                />
              )}
            />
            <Route
              path="/signup"
              exact
              render={(props) => (
                <Signup
                  {...props}
                  onSubmit={signupHandler}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </Modal>
      </Fragment>
    )
}

export default Auth