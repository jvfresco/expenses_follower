import AccountForm from './AccountForm'
import {client} from '../../utils/api-client'
import {useAsync} from '../../utils/hooks'

const Accounts = (props) => {
    const {data, error, run, isLoading, isError, isSuccess} = useAsync()
    const handleSubmit = async(state) => {
      run(client('/accounts/data', {
        data: {
          name: state.accountForm.name.value,
          position: state.accountForm.position.value
        },
        token: props.token
      }))
    }

    return(
        <AccountForm onSubmit={handleSubmit}/>
    )
}

export default Accounts