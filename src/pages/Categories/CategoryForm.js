/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import React from 'react'
import Input from '../../components/UI/Input/Input'
import {FormControls, SaveButton, EditButton, DeleteButton} from '../../components/UI/FormControls/FormControls'
import {required, length} from '../../utils/validators'
import {FormattedMessage, useIntl} from 'react-intl'
import {useForm} from '../page_utils/form_utils'
import { useDataMutation, useSingleItemData } from '../page_utils/data_hooks'
import {InlineError} from '../../components/Error/ErrorComponent'


const CategoryForm = ({id, remove}) => {
    const intl = useIntl()
    const {name} = useSingleItemData(id) || {}
    const {state, inputChangeHandler, handleFormSubmit } = useForm({
            name : {
                value: name ? name : '',
                valid: false,
                touched: false,
                validators: [required, length({min: 3})]
            }
    })

    const {create, update, isCreating, isUpdating, isError, error} = useDataMutation(id)

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
          placeholder={intl.formatMessage({ id: "category.category" })}
          validationMessage={<FormattedMessage id="validation.length3" />}
        />
        {isError ? <InlineError error={error} /> : null}
        {id ? (
          <React.Fragment>
            <EditButton
              loading={isUpdating}
              onClick={() =>
                handleFormSubmit(
                  state,
                  update,
                  inputChangeHandler,
                )
              }
            />
       
            <DeleteButton
              onClick={() => remove(id)}
            />
            
    
          </React.Fragment>
        ) : 
        <SaveButton
          loading={isCreating}
          onClick={() =>
            handleFormSubmit(
              state,
              create,
              inputChangeHandler,
            )
          }
        />
          
        }
      </FormControls>
    );

}

export default CategoryForm