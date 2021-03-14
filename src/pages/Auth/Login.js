/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import {email, required, length} from '../../utils/validators'
import AuthForm from './AuthForm'
import Input from '../../components/UI/Input/Input'
import {Button, Link} from '../../components/UI/Button/Button'
import { FormattedMessage, useIntl } from 'react-intl';
import {useForm} from '../page_utils/form_utils'
import {InlineError} from '../../components/Error/ErrorComponent'

const Login = ({onSubmit, isLoading, isError, error}) => {
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
      
    });



        return (
          <AuthForm>
            <form
              css={{width: "65%", alignSelf: "center",}}
              onSubmit={(e) => handleFormSubmit(state, onSubmit, inputChangeHandler, e)}
            >
              <Input
                id="email"
                label="Email"
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
                id="password"
                label="Password"
                type="password"
                control="input"
                onChange={inputChangeHandler}
                value={state['password'].value}
                valid={state['password'].valid}
                touched={state['password'].touched}
                placeholder={intl.formatMessage({id:'form.password'})}
                validationMessage={<FormattedMessage id='validation.password' />}
              />

              {isError ? <InlineError error={error}/> : null}

              <Button design="primary" type="submit" loading={isLoading} css={{width:'100%'}}>
                <FormattedMessage id='menu.login' />
              </Button>
            </form>
            <h2 css={{color: 'var(--colors-menu-text)', padding: '1rem 2rem'}}><FormattedMessage id='modal.signup' /></h2>
            <Link design="raised" link="/signup">
              <Button design="secondary" css={{width:'30%', padding:'.5rem 1rem'}}>
                <FormattedMessage id='menu.signup' />
              </Button>
            </Link>
          </AuthForm>
        );
}

export default Login