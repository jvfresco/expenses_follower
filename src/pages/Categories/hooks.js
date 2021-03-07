
import {useQueryClient, useMutation, useQuery} from 'react-query'
import {client} from '../../utils/api-client'


function DefaultMutationOptions(type){
    const queryClient = useQueryClient();
    return{
        onSettled: () => queryClient.invalidateQueries(type)
    }
}


const useCategories = (token, type) => {
  return useQuery(type, () =>
    client(`categories/${type}`, { token: token }).then(
      (res) => res.categories
    )
  );
}

const useCategory = (id, token, type) => {
  const {data: categories} = useCategories(token, type)
  return categories?.find(item => item._id === id) ?? null
}


const useRemoveMutation = (token, type) => {
  return useMutation(
    (id) =>
      client(`categories/${type}`, {
        data: { categoryId: id },
        token: token,
        method: "DELETE",
      }),
    DefaultMutationOptions(type)
  );
};

const useCreateMutation = (token, type) => {
return  useMutation(
  (data) =>
    client(`categories/${type}`, {
      data: { category: data.category },
      token: token,
    }),
    DefaultMutationOptions(type)
)
}
const useUpdateMutation = (token, type, id) => {
  return useMutation(
    (data) =>
      client(`categories/${type}`, {
        data: {category: data.category, categoryId: id},
        token: token,
        method: 'PUT'
      }),
      DefaultMutationOptions(type)
  )
}



export {useCreateMutation, useUpdateMutation, useRemoveMutation, useCategories, useCategory}