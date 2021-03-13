import React, {useState} from 'react'
import Input from '../../components/UI/Input/Input'
import {Button} from '../../components/UI/Button/Button'
import {required, length} from '../../utils/validators'
import {FormattedMessage, useIntl} from 'react-intl'
import {useForm} from '../form_utils/form_utils'
import {useCreateMutation, useRemoveMutation, useUpdateMutation, useAccount} from './hooks'
import {FormControls, SaveButton, EditButton, DeleteButton} from '../../components/UI/FormControls/FormControls'

const AccountForm = ({id}) => {
    const intl = useIntl()
    const {name, position} = useAccount(id) || {}
    const {state, inputChangeHandler, handleFormSubmit} = useForm({
        
            name: {
                value: name ? name : '',
                valid: id ? true : false,
                touched: false,
                validators: [required, length({ min: 5 })]
            },
            position: {
                value: position ? position : '',
                valid: id ? true : false,
                touched: false,
                validators: [required]
            }
        
    })

    const {mutate: create, isLoading: isCreating} = useCreateMutation()
    const {mutate: remove, isLoading: isRemoving} = useRemoveMutation()
    const {mutate: update, isLoading: isUpdating} = useUpdateMutation(id)
   
    return (
        <FormControls>
            <Input
                id="name"
                label="name"
                type="input"
                control="input"
                onChange={inputChangeHandler}
                value={state.name.value}
                valid={state.name.valid}
                touched={state.name.touched}
                placeholder={intl.formatMessage({id:'account.name'})}
                validationMessage={<FormattedMessage id='validation.length5' />}
              />
              <Input
                id="position"
                label="position"
                type="input"
                control="currency"
                onChange={inputChangeHandler}
                value={state.position.value}
                valid={state.position.valid}
                touched={state.position.touched}
                placeholder={intl.formatMessage({id:'account.position'})}
                validationMessage={<FormattedMessage id='validation.required' />}
              />
              {
                  id ?
                  <React.Fragment>
                  <EditButton loading={isUpdating} onClick={() => handleFormSubmit(state, update, inputChangeHandler)}/>
                  <DeleteButton loading={isRemoving} onClick={() => remove(id)}/>
                  </React.Fragment>
                  :
                  <SaveButton loading={isCreating} onClick={() => handleFormSubmit(state, create, inputChangeHandler)}/>

              }
              

        </FormControls>
    )

}

export default AccountForm