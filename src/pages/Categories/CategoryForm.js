import Input from '../../components/UI/Input/Input'
import {Button} from '../../components/UI/Button/Button'
import {required, length} from '../../utils/validators'
import {FormattedMessage, useIntl} from 'react-intl'
import {useForm} from '../form_utils/form_utils'



const CategoryForm = (props) => {
    const intl = useIntl()
    const {state, inputChangeHandler, handleFormSubmit } = useForm({
        categoryForm: {
            category : {
                value: '',
                valid: false,
                touched: false,
                validators: [required, length({min: 3})]
            }
        }
    })

    return (
        <form onSubmit={(e) => handleFormSubmit(e, state, props.onSubmit, inputChangeHandler, Object.keys(state)[0])}>
            <Input
                id="category"
                label="category"
                type="input"
                control="input"
                onChange={inputChangeHandler}
                value={state.categoryForm.category.value}
                valid={state.categoryForm.category.valid}
                touched={state.categoryForm.category.touched}
                placeholder={intl.formatMessage({id:'category.category'})}
                validationMessage={<FormattedMessage id='validation.length3' />}
              />
              
              <Button design="raised" type="submit" loading={props.loading}>
                <FormattedMessage id='button.save' />
              </Button>
        </form>
    )

}

export default CategoryForm