/* @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import React from 'react'
import Input from '../../components/UI/Input/Input'
import {Button} from '../../components/UI/Button/Button'
import {required, length} from '../../utils/validators'
import {FormattedMessage, useIntl} from 'react-intl'
import {useForm} from '../form_utils/form_utils'
import { useCreateMutation, useUpdateMutation, useRemoveMutation, useCategory } from './hooks'


const CategoryForm = ({type, id}) => {
    const intl = useIntl()
    const {name} = useCategory(id, type) || {}
    const {state, inputChangeHandler, handleFormSubmit } = useForm({
        categoryForm: {
            name : {
                value: name ? name : '',
                valid: false,
                touched: false,
                validators: [required, length({min: 3})]
            }
        }
    })

    const {mutate: create, isLoading: isCreating} = useCreateMutation(type)
    const {mutate: update, isLoading: isUpdating} = useUpdateMutation(type, id)
    const {mutate: remove, isLoading: isRemoving} = useRemoveMutation(type)

    return (
      <div css={{marginBottom: '4rem'}}>
        <Input
          id="name"
          label="name"
          type="input"
          control="input"
          onChange={inputChangeHandler}
          value={state.categoryForm.name.value}
          valid={state.categoryForm.name.valid}
          touched={state.categoryForm.name.touched}
          placeholder={intl.formatMessage({ id: "category.category" })}
          validationMessage={<FormattedMessage id="validation.length3" />}
        />

        {id ? (
          <React.Fragment>
            <Button
              design="secondary"
              type="nada"
              loading={isUpdating}
              style={{ width: "50%" }}
              onClick={(e) =>
                handleFormSubmit(
                  e,
                  state,
                  update,
                  inputChangeHandler,
                  Object.keys(state)[0]
                )
              }
            >
              <FormattedMessage id="button.edit" />
            </Button>
            <Button
              design="danger"
              type="nada"
              loading={isRemoving}
              style={{ width: "50%" }}
              onClick={() => remove(id)}
            >
              <FormattedMessage id="button.delete" />
            </Button>
          </React.Fragment>
        ) : 
        <Button
          design="primary"
          type="submit"
          loading={isCreating}
          style={{ width: "100%" }}
          onClick={(e) =>
            handleFormSubmit(
              e,
              state,
              create,
              inputChangeHandler,
              Object.keys(state)[0]
            )
          }
        >
          <FormattedMessage id="button.save" />
        </Button>
        }
      </div>
    );

}

export default CategoryForm