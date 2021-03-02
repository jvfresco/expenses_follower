import ExpenseForm from './ExpenseForm'
import {client} from '../../utils/api-client'
import {useAsync} from '../../utils/hooks'

const ExpensesPage = (props) =>  {
  const {data, error, run, isLoading, isError, isSuccess} = useAsync()

  const onExpensePost = async(expenseData) => {
      run(client('/movements/expense', {
        data: {
            amount: expenseData.amount,
            description: expenseData.description,
            date: expenseData.date,
            category: expenseData.category,
            account: expenseData.account,
            type: expenseData.type ? expenseData.type : null,
            tax: expenseData.tax ? expenseData.tax : null,
        },
        token: props.token
      }))
  }    



return(
  <div>
      <h1>Add new expense</h1>
      <ExpenseForm onSubmit={onExpensePost}/>
      {isError ? <p style={{color: 'red'}}>{error.message}</p> : null}
      {isLoading ? <p style={{color: 'blue'}}>loading...</p> : null}
      {isSuccess ? <p style={{color: 'green'}}>{data.message}</p> : null}
      <h2>Expenses list</h2>
  </div>
)

}


export default ExpensesPage