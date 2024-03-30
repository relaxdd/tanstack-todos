import { Pagination } from '../Pagination.tsx'
import { useTodoDispatch, useTodoStore } from '../../store/todoStore.ts'

const TodoPagination = () => {
  const { page, filter, total } = useTodoStore()
  const { setState } = useTodoDispatch()

  if (!total) return null

  return (
    <div className="d-flex align-items-center justify-content-end gap-3">
      <Pagination
        page={page}
        total={total}
        limit={filter.showLimit}
        changePage={(page) => setState({ page })}
      />
    </div>
  )
}

export default TodoPagination
