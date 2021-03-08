import AccountForm from './AccountForm'
import {client} from '../../utils/api-client'
import {useAsync} from '../../utils/hooks'
import {useAuth} from '../../context/auth-context'

const Accounts = () => {
    const {user} = useAuth()
    const {data, error, run, isLoading, isError, isSuccess} = useAsync()
    const handleSubmit = async(state) => {
      run(client('/accounts/data', {
        data: {
          name: state.accountForm.name.value,
          position: state.accountForm.position.value
        },
        token: user.token
      }))
    }

    return(
        <AccountForm onSubmit={handleSubmit}/>
    )
}

export default Accounts