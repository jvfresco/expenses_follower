import Input from '../../components/UI/Input/Input'
import {Button} from '../../components/UI/Button/Button'
import {required, length} from '../../utils/validators'
import {FormattedMessage, useIntl} from 'react-intl'
import {useForm} from '../form_utils/form_utils'

const ExpenseForm = (props) => {
    const intl = useIntl()
//TODO: MAKE REQUIRED TAX AND TYPE IF THE USER CHECKS FOR THEM ADDING PROPER VALIDATION
//TODO: AUTOCKECK TAX AND TYPE IF THE USER HAS IT CONFIGURED IN OPTIONS

    const {state, inputChangeHandler, handleFormSubmit } = useForm({
        expenseForm: {
          description: {
            value: '',
            valid: false,
            touched: false,
            validators: [required, length({ min: 5 })]
          },
          amount: {
            value: '',
            valid: false,
            touched: false,
            validators: [required]
          },
          tax: {
            value: '',
            valid: true,
            touched: false,
          },
          date: {
            value:'',
            valid: false,
            touched: false,
            validators: [required]
          },
          category: {
            value:'',
            valid: false,
            touched: false,
            validators: [required]
          },
          type: {
            value:'',
            valid: true,
            touched: false,
          },
          account: {
            value:'',
            valid: false,
            touched: false,
            validators: [required]
          },
        }
      });



    return(
        <form onSubmit={(e) => handleFormSubmit(e, state, props.onSubmit, inputChangeHandler, Object.keys(state)[0])}>
            <Input
                id="description"
                label="description"
                type="input"
                control="input"
                onChange={inputChangeHandler}
                value={state.expenseForm.description.value}
                valid={state.expenseForm.description.valid}
                touched={state.expenseForm.description.touched}
                placeholder={intl.formatMessage({id:'movement.description'})}
                validationMessage={<FormattedMessage id='validation.length5' />}
              />
              <Input
                id="amount"
                label="amount"
                type="input"
                control="currency"
                onChange={inputChangeHandler}
                value={state.expenseForm.amount.value}
                valid={state.expenseForm.amount.valid}
                touched={state.expenseForm.amount.touched}
                placeholder={intl.formatMessage({id:'movement.amount'})}
                validationMessage={<FormattedMessage id='validation.required' />}
              />
              <Input
                id="date"
                label="date"
                type="date"
                control="input"
                onChange={inputChangeHandler}
                value={state.expenseForm.date.value}
                valid={state.expenseForm.date.valid}
                touched={state.expenseForm.date.touched}
                validationMessage={<FormattedMessage id='validation.required' />}
                
              />
               
              
              <Input
                id="category"
                name="category"
                control="select"
                label="category"
                onChange={inputChangeHandler}
                valid={state.expenseForm.category.valid}
                touched={state.expenseForm.category.touched}
                options={[{id: "1", name:"cat1"}, {id: "2", name:"cat2"}]}
                validationMessage={<FormattedMessage id='validation.required' />}
                data-testid = "category-input"
              />
              
              <Input 
                id="account"
                name="account"
                control="select"
                label="account"
                onChange={inputChangeHandler}
                valid={state.expenseForm.account.valid}
                touched={state.expenseForm.account.touched}
                options={[{id: "1", name:"account1"}]}
                validationMessage={<FormattedMessage id='validation.required' />}
                data-testid = "account-input"
              />
              <Input
                id="tax"
                label="tax"
                type="input"
                control="input"
                onChange={inputChangeHandler}
                value={state.expenseForm.tax.value}
                valid={state.expenseForm.tax.valid}
                touched={state.expenseForm.tax.touched}
                placeholder={intl.formatMessage({id:'movement.tax'})}
              />

              <Input 
                id="type"
                name="type"
                control="select"
                label="type"
                onChange={inputChangeHandler}
                valid={state.expenseForm.type.valid}
                touched={state.expenseForm.type.touched}
                options={[{id: "1", name:"type1"}, {id: "2", name:"type2"}]}
                data-testid = "type-input"
              />
              <Button design="primary" type="submit" loading={props.loading}>
                <FormattedMessage id='button.save' />
              </Button>
        </form>
    )
}

export default ExpenseForm