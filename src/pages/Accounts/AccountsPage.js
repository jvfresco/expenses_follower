import AccountForm from './AccountForm'

const Accounts = (props) => {
    const handleSubmit = async(state) => {
       
        try {
          const res = await fetch("http://localhost:8080/accounts/data", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + props.token,
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                name: state.accountForm.name.value,
                position: state.accountForm.position.value
            }),
          });

          if(res.status === 403){
            throw new Error("Not authorized")
          }else if (res.status !== 200 && res.status !== 201) {
            throw new Error("Creating or editing account failed!");
          }
        } catch (err) {
            console.log(err)
        }
    }

    return(
        <AccountForm onSubmit={handleSubmit}/>
    )
}

export default Accounts