import {useQueryClient, useMutation, useQuery} from 'react-query'
import {useClient} from '../../context/auth-context'
import {useRouteMatch} from 'react-router-dom'

function useProvidersData(){
    const queryClient = useQueryClient()
    const client = useClient()
    const {url} = useRouteMatch()
    return {queryClient, url, client}
}

function defaultMutationOptions(url, queryClient){
    return{
        onSettled: () => queryClient.invalidateQueries(url),
        onError: (err, variables, recover) =>
          typeof recover === 'function' ? recover() : null
    }
}

const useTableData = () => {
    const {url, client} = useProvidersData()
    return useQuery(url,() =>
        client(url).then(
            (res) => res.data
        )
    );
}

const useSingleItemData = (id) => {
    const {data} = useTableData()
    return data?.find(item => item._id === id) ?? null
  }

const useCreateMutation = () => {
  const {queryClient, url, client} = useProvidersData()
    return  useMutation(
      (data) =>
        client(url, {
          data: { ...data }
        }),
        {...defaultMutationOptions(url, queryClient)}
    )
  }
  

const useRemoveMutation = () => {
   const {queryClient, url, client} = useProvidersData()
    return useMutation(
      (id) =>
        client(url, {
          data: { requestedId: id },
          method: "DELETE",
        }),
        {
          onMutate: (id) => {
            queryClient.cancelQueries(url)
            const previous = queryClient.getQueryData(url)
            queryClient.setQueryData(url, (old) => {
              return old.filter(item => item._id !== id )
            })
            return () => queryClient.setQueryData(url, previous)
          },
          ...defaultMutationOptions(url, queryClient) 
        },
        
    );
  };

  const useUpdateMutation = () => {
    const {queryClient, url, client} = useProvidersData()
    return useMutation(
      (data) =>
       { 
         return client(url, {
          data: data,
          method: 'PUT'
        })},
        {
          onMutate: (data) => {
            const {requestedId, ...updatedata} = data
            queryClient.cancelQueries(url)
            const previous = queryClient.getQueryData(url)
            queryClient.setQueryData(url, (old) => {
              return old.map(item => {
                return item._id === requestedId ? {...item, ...updatedata} : item
              })
            })
            return () => queryClient.setQueryData(url, previous)
          },
          ...defaultMutationOptions(url, queryClient)
        },
        
    )
  }
  
  const useDataMutation = () => {
    const {mutate: create, isLoading: isCreating, isError: isCreatingError, error: error1} = useCreateMutation()
    const {mutate: remove, isLoading: isRemoving, isError: isRemovingError, error: error2} = useRemoveMutation()
    const {mutate: update, isLoading: isUpdating, isError: isUpdatingError, error: error3} = useUpdateMutation()
    console.log('creating error: '+isCreatingError)
    console.log('removing error: '+isRemovingError)
    console.log('updating error: '+isUpdatingError)
    const isError = isUpdatingError || isRemovingError || isCreatingError
    const error = error1 || error2 || error3

    return {create, remove, update, isCreating, isRemoving, isUpdating, isError, error}
  }



export {useTableData, useCreateMutation, useRemoveMutation, useUpdateMutation, useSingleItemData, useDataMutation}

