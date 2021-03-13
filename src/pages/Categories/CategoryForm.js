/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import React from 'react'
import Input from '../../components/UI/Input/Input'
import {FormControls, SaveButton, EditButton, DeleteButton} from '../../components/UI/FormControls/FormControls'
import {required, length} from '../../utils/validators'
import {FormattedMessage, useIntl} from 'react-intl'
import {useForm} from '../form_utils/form_utils'
import { useCreateMutation, useUpdateMutation, useRemoveMutation, useCategory } from './hooks'


const CategoryForm = ({type, id}) => {
    const intl = useIntl()
    const {name} = useCategory(id, type) || {}
    const {state, inputChangeHandler, handleFormSubmit } = useForm({
       
            name : {
                value: name ? name : '',
                valid: false,
                touched: false,
                validators: [required, length({min: 3})]
            }
        
    })

    const {mutate: create, isLoading: isCreating} = useCreateMutation(type)
    const {mutate: update, isLoading: isUpdating} = useUpdateMutation(type, id)
    const {mutate: remove, isLoading: isRemoving} = useRemoveMutation(type)

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
              loading={isRemoving}
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