import {useMemo} from 'react'
import CategoryForm from './CategoryForm'
import {client} from '../../utils/api-client'
import {useAsync} from '../../utils/hooks'
import {useQuery} from 'react-query'
import Table from './Table'

const CategoriesPage = (props) => {
  const {data, error, run, isLoading, isError, isSuccess} = useAsync()
  const type = props.purpose === 'expense' ? 'expense-category' : 'income-category'
  
  const handleFormSubmit = async(data) => {
      run(
        client("categories/" + type, {
          data: { category: data.category },
          token: props.token,
        })
      )
 
  }

  const { data: expenses } = useQuery("expenses", () =>
    client(`categories/${type}`, { token: props.token }).then(
      (res) => res.expenseCategories
    )
  );
  
  const columns = useMemo(
    () => [
      {
        Header: "Category name", //Column name
        accessor: "category", // name of the key in data
      },
    ],
    []
    );

  return (
      <div>
          <h1>{props.purpose === 'expense' ? 'Expenses categories' : 'Incomes categories'}</h1>
          <CategoryForm onSubmit={handleFormSubmit}/>
          {isError ? <p style={{color: 'red'}}>{error.message}</p> : null}
          {isLoading ? <p style={{color: 'blue'}}>loading...</p> : null}
          {isSuccess ? <p style={{color: 'green'}}>{data.message}</p> : null}
          <h2>{props.purpose === 'expense' ? 'Expenses categories list' : 'Incomes categories list'}</h2>
          {expenses ? <Table columns={columns} data={expenses}/> : null}
      </div>
  )
}

export default CategoriesPage