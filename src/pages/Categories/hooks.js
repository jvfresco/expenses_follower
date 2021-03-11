import {useQueryClient, useMutation, useQuery} from 'react-query'
import {useClient} from '../../context/auth-context'

function defaultMutationOptions(type, queryClient){
    return{
        onSettled: () => queryClient.invalidateQueries(type),
        onError: (err, variables, recover) => 
          typeof recover === 'function' ? recover() : null
    }
}


const useCategories = (type) => {
  const client = useClient()
  return useQuery(type, () =>
    client(`categories${type}`).then(
      (res) => res.categories
    )
  );
}

const useCategory = (id, type) => {
  const {data: categories} = useCategories(type)
  return categories?.find(item => item._id === id) ?? null
}


const useRemoveMutation = (type) => {
  const queryClient = useQueryClient()
  const client = useClient()
  return useMutation(
    (id) =>
      client(`categories${type}`, {
        data: { categoryId: id },
        method: "DELETE",
      }),
      {
        onMutate: (id) => {
          queryClient.cancelQueries(type)
          const previous = queryClient.getQueryData(type)
          queryClient.setQueryData(type, (old) => {
            return old.filter(item => item._id !== id )
          })
          return () => queryClient.setQueryData(type, previous)
        } 
      },
    {...defaultMutationOptions(type, queryClient)}
  );
};

const useCreateMutation = (type) => {
  const queryClient = useQueryClient()
  const client = useClient()
  return  useMutation(
    (data) =>
      client(`categories${type}`, {
        data: { name: data.name }
      }),
      {...defaultMutationOptions(type, queryClient)}
  )
}

const useUpdateMutation = (type, id) => {
  const queryClient = useQueryClient()
  const client = useClient()
  return useMutation(
    (data) =>
      client(`categories${type}`, {
        data: {name: data.name, categoryId: id},
        method: 'PUT'
      }),
      {
        onMutate: (data) => {
          queryClient.cancelQueries(type)
          const previous = queryClient.getQueryData(type)
          queryClient.setQueryData(type, (old) => {
            return old.map(item => {
              return item._id === id ? {...item, ...data} : item
            })
          })
          return () => queryClient.setQueryData(type, previous)
        }
      },
      {...defaultMutationOptions(type, queryClient)}
  )
}



export {useCreateMutation, useUpdateMutation, useRemoveMutation, useCategories, useCategory}