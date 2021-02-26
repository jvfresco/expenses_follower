import React, { useState } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { required, length, email } from '../../utils/validators';
import AuthForm from './AuthForm';
import { FormattedMessage, useIntl } from 'react-intl';
import {useForm} from '../form_utils/form_utils'

const Signup = (props) => {
  const intl = useIntl()
  const {state, inputChangeHandler, handleFormSubmit} = useForm({
    signupForm: {
      email: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, email]
      },
      password: {
        value: '',
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })]
      },
      name: {
        value: '',
        valid: false,
        touched: false,
        validators: [required]
      },
    }
  });



    return (
      <AuthForm>
        <form onSubmit={(e) => handleFormSubmit(e, state, props.onSubmit, inputChangeHandler, Object.keys(state)[0])} 
              style={{width: "65%", alignSelf: "center"}}>
          <Input
            id="email"
            label="EMAIL"
            type="email"
            control="input"
            onChange={inputChangeHandler}
            value={state.signupForm['email'].value}
            valid={state.signupForm['email'].valid}
            touched={state.signupForm['email'].touched}
            placeholder={intl.formatMessage({id:'form.email'})}
            validationMessage={<FormattedMessage id='validation.email' />}
          />
          <Input
            id="name"
            label="NAME"
            type="text"
            control="input"
            onChange={inputChangeHandler}
            value={state.signupForm['name'].value}
            valid={state.signupForm['name'].valid}
            touched={state.signupForm['name'].touched}
            placeholder={intl.formatMessage({id:'form.name'})}
            validationMessage={<FormattedMessage id='validation.required' />}
          />
          <Input
            id="password"
            label="PASSWORD"
            type="password"
            control="input"
            onChange={inputChangeHandler}
            value={state.signupForm['password'].value}
            valid={state.signupForm['password'].valid}
            touched={state.signupForm['password'].touched}
            placeholder={intl.formatMessage({id:'form.password'})}
            validationMessage={<FormattedMessage id='validation.password' />}
          />
          <Button design="raised" type="submit" loading={props.loading}>
            <FormattedMessage id='menu.signup'/> 
          </Button>
        </form>
        <FormattedMessage id='modal.login' />
            <Button design="raised" link="/">
                <FormattedMessage id='menu.login' />
            </Button>
      </AuthForm>
    );
  
}

export default Signup;