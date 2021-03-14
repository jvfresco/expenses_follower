import {useQueryClient, useMutation, useQuery} from 'react-query'
import {useClient} from '../../context/auth-context'
import {useRouteMatch} from 'react-router-dom'

function useProvidersData(){
    const queryClient = useQueryClient()
    const client = useClient()
    const {url} = useRouteMatch()
    return {queryClient, url, client}
}

function defaultMutationOptions(type, queryClient){
    return{
        onSettled: () => queryClient.invalidateQueries(type),
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
          } 
        },
      {...defaultMutationOptions(url, queryClient)}
    );
  };

  const useUpdateMutation = (id) => {
    const {queryClient, url, client} = useProvidersData()
    return useMutation(
      (data) =>
        client(url, {
          data: { requestedId: id, ...data },
          method: 'PUT'
        }),
        {
          onMutate: (data) => {
            queryClient.cancelQueries(url)
            const previous = queryClient.getQueryData(url)
            queryClient.setQueryData(url, (old) => {
              return old.map(item => {
                return item._id === id ? {...item, ...data} : item
              })
            })
            return () => queryClient.setQueryData(url, previous)
          }
        },
        {...defaultMutationOptions(url, queryClient)}
    )
  }
  



export {useTableData, useCreateMutation, useRemoveMutation, useUpdateMutation, useSingleItemData}

