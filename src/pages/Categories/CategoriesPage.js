import CategoryForm from './CategoryForm'
import {client} from '../../utils/api-client'
import {useAsync} from '../../utils/hooks'

const CategoriesPage = (props) => {
  const {data, error, run, isLoading, isError, isSuccess} = useAsync()
    const handleFormSubmit = async(data) => {
        const type = props.purpose === 'expense' ? 'expense-category' : 'income-category'

        run(client("http://localhost:8080/categories/" + type, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + props.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: data.category,
          }),
        })
        )
    }
    
    return (
        <div>
            <h1>{props.purpose === 'expense' ? 'Expenses categories' : 'Incomes categories'}</h1>
            <CategoryForm onSubmit={handleFormSubmit}/>
            {isError ? <p style={{color: 'red'}}>{error.message}</p> : null}
            {isLoading ? <p style={{color: 'blue'}}>loading...</p> : null}
            {isSuccess ? <p style={{color: 'green'}}>{data.message}</p> : null}
            <h2>{props.purpose === 'expense' ? 'Expenses categories list' : 'Incomes categories list'}</h2>
        </div>
    )
}

export default CategoriesPage