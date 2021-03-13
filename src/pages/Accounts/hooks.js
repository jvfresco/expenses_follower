import {useQueryClient, useMutation, useQuery} from 'react-query'
import {useClient} from '../../context/auth-context'

function defaultMutationOptions(type, queryClient){
    return{
        onSettled: () => queryClient.invalidateQueries(type),
        onError: (err, variables, recover) => 
          typeof recover === 'function' ? recover() : null
    }
}

const useAccounts = () => {
    const endpoint = 'accounts/data'
    const client = useClient()
    return useQuery(endpoint,() =>
        client(endpoint).then(
            (res) => res.data
        )
    );
}

const useAccount = (id) => {
    const {data: accounts} = useAccounts()
    return accounts?.find(item => item._id === id) ?? null
  }

const useCreateMutation = () => {
    const queryClient = useQueryClient()
    const client = useClient()
    return  useMutation(
      (data) =>
        client(`accounts/data`, {
          data: { ...data }
        }),
        {...defaultMutationOptions('accounts/data', queryClient)}
    )
  }
  

const useRemoveMutation = () => {
    const queryClient = useQueryClient()
    const client = useClient()
    const endpoint = 'accounts/data'
    return useMutation(
      (id) =>
        client(endpoint, {
          data: { requestedId: id },
          method: "DELETE",
        }),
        {
          onMutate: (id) => {
            queryClient.cancelQueries(endpoint)
            const previous = queryClient.getQueryData(endpoint)
            queryClient.setQueryData(endpoint, (old) => {
              return old.filter(item => item._id !== id )
            })
            return () => queryClient.setQueryData(endpoint, previous)
          } 
        },
      {...defaultMutationOptions(endpoint, queryClient)}
    );
  };

  const useUpdateMutation = (id) => {
    const queryClient = useQueryClient()
    const client = useClient()
    const endpoint = 'accounts/data'
    return useMutation(
      (data) =>
        client(endpoint, {
          data: { requestedId: id, ...data },
          method: 'PUT'
        }),
        {
          onMutate: (data) => {
            queryClient.cancelQueries(endpoint)
            const previous = queryClient.getQueryData(endpoint)
            queryClient.setQueryData(endpoint, (old) => {
              return old.map(item => {
                return item._id === id ? {...item, ...data} : item
              })
            })
            return () => queryClient.setQueryData(endpoint, previous)
          }
        },
        {...defaultMutationOptions(endpoint, queryClient)}
    )
  }
  

export {useAccounts, useCreateMutation, useRemoveMutation, useUpdateMutation, useAccount}

