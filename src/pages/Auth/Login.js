import {email, required, length} from '../../utils/validators'
import AuthForm from './AuthForm'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { FormattedMessage, useIntl } from 'react-intl';
import {useForm} from '../form_utils/form_utils'

const Login = (props) => {
    const intl = useIntl()
    const {state, inputChangeHandler, handleFormSubmit} = useForm({
        loginForm: {
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
        }
    });



        return (
          <AuthForm>
            <form
              style={{width: "65%", alignSelf: "center",}}
              onSubmit={(e) => handleFormSubmit(e, state, props.onSubmit, inputChangeHandler, Object.keys(state)[0])}
            >
              <Input
                id="email"
                label="Email"
                type="email"
                control="input"
                onChange={inputChangeHandler}
                value={state.loginForm['email'].value}
                valid={state.loginForm['email'].valid}
                touched={state.loginForm['email'].touched}
                placeholder={intl.formatMessage({id:'form.email'})}
                validationMessage={<FormattedMessage id='validation.email' />}
              />
              <Input
                id="password"
                label="Password"
                type="password"
                control="input"
                onChange={inputChangeHandler}
                value={state.loginForm['password'].value}
                valid={state.loginForm['password'].valid}
                touched={state.loginForm['password'].touched}
                placeholder={intl.formatMessage({id:'form.password'})}
                validationMessage={<FormattedMessage id='validation.password' />}
              />
              <Button design="raised" type="submit" loading={props.loading}>
                <FormattedMessage id='menu.login' />
              </Button>
            </form>
            <FormattedMessage id='modal.signup' />
            <Button design="raised" link="/signup">
                <FormattedMessage id='menu.signup' />
            </Button>
          </AuthForm>
        );
}

export default Login