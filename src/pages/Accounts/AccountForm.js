import React, {useState} from 'react'
import Input from '../../components/UI/Input/Input'
import {Button} from '../../components/UI/Button/Button'
import {required, length} from '../../utils/validators'
import {FormattedMessage, useIntl} from 'react-intl'
import {useForm} from '../form_utils/form_utils'

const AccountForm = (props) => {
    const intl = useIntl()
    const {state, inputChangeHandler, handleFormSubmit} = useForm({
        accountForm:{
            name: {
                value: '',
                valid: false,
                touched: false,
                validators: [required, length({ min: 5 })]
            },
            position: {
                value: '',
                valid: false,
                touched: false,
                validators: [required]
            }
        },
        formIsValid: false
    })

   
    return (
        <form onSubmit={(e) => handleFormSubmit(e, state, props.onSubmit, inputChangeHandler, Object.keys(state)[0])}>
            <Input
                id="name"
                label="name"
                type="input"
                control="input"
                onChange={inputChangeHandler}
                value={state.accountForm.name.value}
                valid={state.accountForm.name.valid}
                touched={state.accountForm.name.touched}
                placeholder={intl.formatMessage({id:'account.name'})}
                validationMessage={<FormattedMessage id='validation.length5' />}
              />
              <Input
                id="position"
                label="position"
                type="input"
                control="currency"
                onChange={inputChangeHandler}
                value={state.accountForm.position.value}
                valid={state.accountForm.position.valid}
                touched={state.accountForm.position.touched}
                placeholder={intl.formatMessage({id:'account.position'})}
                validationMessage={<FormattedMessage id='validation.required' />}
              />
              <Button design="raised" type="submit" loading={props.loading}>
                <FormattedMessage id='button.save' />
              </Button>
        </form>
    )

}

export default AccountForm