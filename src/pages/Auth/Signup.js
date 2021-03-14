/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import Input from '../../components/UI/Input/Input';
import {Button, Link} from '../../components/UI/Button/Button';
import { required, length, email } from '../../utils/validators';
import AuthForm from './AuthForm';
import { FormattedMessage, useIntl } from 'react-intl';
import {useForm} from '../page_utils/form_utils'

const Signup = ({onSubmit, isError, isLoading, isSuccess}) => {
  const intl = useIntl()
  const {state, inputChangeHandler, handleFormSubmit} = useForm({
    
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
    
  });



    return (
      <AuthForm>
        <form onSubmit={(e) => handleFormSubmit(state, onSubmit, inputChangeHandler,e)} 
              css={{width: "65%", alignSelf: "center"}}>
          <Input
            id="email"
            label="EMAIL"
            type="email"
            control="input"
            onChange={inputChangeHandler}
            value={state['email'].value}
            valid={state['email'].valid}
            touched={state['email'].touched}
            placeholder={intl.formatMessage({id:'form.email'})}
            validationMessage={<FormattedMessage id='validation.email' />}
          />
          <Input
            id="name"
            label="NAME"
            type="text"
            control="input"
            onChange={inputChangeHandler}
            value={state['name'].value}
            valid={state['name'].valid}
            touched={state['name'].touched}
            placeholder={intl.formatMessage({id:'form.name'})}
            validationMessage={<FormattedMessage id='validation.required' />}
          />
          <Input
            id="password"
            label="PASSWORD"
            type="password"
            control="input"
            onChange={inputChangeHandler}
            value={state['password'].value}
            valid={state['password'].valid}
            touched={state['password'].touched}
            placeholder={intl.formatMessage({id:'form.password'})}
            validationMessage={<FormattedMessage id='validation.password' />}
          />
          <Button design="primary" type="submit" loading={isLoading} css={{width:'100%'}}>
            <FormattedMessage id='menu.signup'/> 
          </Button>
        </form>
        
        <h2 css={{color: 'var(--colors-menu-text)', padding: '1rem 2rem'}}><FormattedMessage id='modal.login' /></h2>
        <Link link="/global">
          <Button design="secondary" css={{width:'30%', padding:'.5rem 1rem'}}>
            <FormattedMessage id='menu.login' />
          </Button>
        </Link>
      </AuthForm>
    );
  
}

export default Signup;