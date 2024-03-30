import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_SLUG } from '../defines.ts'
import { TodosApiService } from '../api/TodosApiService.ts'
import { ITodo } from '../schemes/todos.ts'
import { ITodoStore } from '../store/todoStore.ts'

function useFetchTodos(page: number, query: ITodoStore['filter']) {
  return useQuery({
    queryKey: [QUERY_SLUG.TODO, { page, ...query }],
    queryFn: () => TodosApiService.getAll(page, query),
    initialData: { items: [], total: 0 }
  })
}

function useUpdateTodo() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, ITodo>({
    mutationFn: (it) => TodosApiService.update(it),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_SLUG.TODO] })
    },
    onError: (err) => {
      console.error(err)
      alert(err.message)
    }
  })
}

function useDeleteTodo() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, number>({
    mutationFn: (id) => TodosApiService.delete(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_SLUG.TODO] })
    },
    onError: (err) => {
      console.error(err)
      alert(err.message)
    }
  })
}

export {
  useFetchTodos,
  useUpdateTodo,
  useDeleteTodo
}
