import ExpenseForm from './ExpenseForm'

const ExpensesPage = (props) =>  {

const onExpensePost = async(expenseData) => {
    
    try{
        const res = await fetch('http://localhost:8080/movements/expense', {
            method: "POST",
            headers: {
                Authorization: "Bearer " + props.token,
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                amount: expenseData.amount,
                description: expenseData.description,
                date: expenseData.date,
                category: expenseData.category,
                account: expenseData.account,
                type: expenseData.type ? expenseData.type : null,
                tax: expenseData.tax ? expenseData.tax : null,
            }),
          })
          if(res.status === 403){
            throw new Error("Not authorized")
          }else if (res.status !== 200 && res.status !== 201) {
            throw new Error("Creating or editing expense entry failed!");
          }
    }catch(err){
        console.log(err)
    }
}    

return <ExpenseForm onSubmit={onExpensePost}/>

}


export default ExpensesPage