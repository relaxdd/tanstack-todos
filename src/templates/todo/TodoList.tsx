import TodoItem from './TodoItem.tsx'
import { ListGroup, Spinner } from 'react-bootstrap'
import { useDeleteTodo, useFetchTodos, useUpdateTodo } from '../../queries/todos.ts'
import { useTodoDispatch, useTodoSelector } from '../../store/todoStore.ts'
import { useEffect } from 'react'

const TodoList = () => {
  const { filter, page } = useTodoSelector(({ filter, page }) => ({ filter, page }))
  const { isFetching, error, data: { total, items }, } = useFetchTodos(page, filter)
  const { setState } = useTodoDispatch()

  const { mutate: updateTodo, isPending: isUpdating } = useUpdateTodo()
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo()

  useEffect(() => {
    setState({ total })
  }, [total])

  if (isFetching) {
    return <Spinner variant="primary" />
  }

  if (error) {
    console.log(error)
    return <p className="text-danger">Во время запроса произошла ошибка</p>
  }

  if (!items.length) {
    return <p>Нет данных для отображения...</p>
  }

  return (
    <ListGroup>
      {items.map((it) => (
        <TodoItem
          key={it.id}
          item={it}
          disabled={isUpdating || isDeleting}
          onDelete={deleteTodo}
          onChange={updateTodo}
        />
      ))}
    </ListGroup>
  )
}

export { TodoList }
