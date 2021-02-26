import { handleFormSubmit } from '../form_utils/form_utils'
import CategoryForm from './CategoryForm'

const CategoriesPage = (props) => {

    const handleFormSubmit = async(data) => {
        const type = props.purpose === 'expense' ? 'expense-category' : 'income-category'

        try {
            const res = await fetch("http://localhost:8080/categories/" + type, {
              method: "POST",
              headers: {
                  Authorization: "Bearer " + props.token,
                  "Content-Type": "application/json" 
              },
              body: JSON.stringify({
                  category: data.category,
              }),
            });
  
            if(res.status === 403){
              throw new Error("Not authorized")
            }else if (res.status !== 200 && res.status !== 201) {
              throw new Error("Creating or editing category failed!");
            }
          } catch (err) {
              console.log(err)
          }
    }
    
    return (
        <div>
            <h1>{props.purpose === 'expense' ? 'Expenses categories' : 'Incomes categories'}</h1>
            <CategoryForm onSubmit={handleFormSubmit}/>
            <h2>{props.purpose === 'expense' ? 'Expenses categories list' : 'Incomes categories list'}</h2>
        </div>
    )
}

export default CategoriesPage