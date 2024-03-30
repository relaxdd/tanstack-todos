import { Container } from 'react-bootstrap'
import TodoForm from './TodoForm.tsx'
import TodoFilter from './TodoFilter.tsx'
import TodoPagination from './TodoPagination.tsx'
import { TodoList } from './TodoList.tsx'

const TodoShell = () => {
  return (
    <Container>
      <div className="d-flex flex-column gap-3">
        <TodoForm />

        <div className="d-flex align-items-center justify-content-between gap-3">
          <TodoFilter />
          <TodoPagination />
        </div>

        <TodoList />
        <TodoPagination />
      </div>
    </Container>
  )
}

export default TodoShell
