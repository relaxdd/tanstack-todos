import { FormControl, ListGroupItem } from 'react-bootstrap'
import { FC, useState } from 'react'
import { ITodo } from '../../schemes/todos.ts'
import { CloseSvg } from '../svg/CloseSvg.tsx'
import EditSvg from '../svg/EditSvg.tsx'
import { getTextWithFoundMark } from '../../utils'
import { useTodoSelector } from '../../store/todoStore.ts'
import CheckSvg from '../svg/CheckSvg.tsx'

interface TodoItemProps {
  item: ITodo,
  disabled: boolean,
  onChange: (item: ITodo) => void,
  onDelete: (id: number) => void
}

const TodoItem: FC<TodoItemProps> = ({ item, disabled, onChange, onDelete }) => {
  const [title, setTitle] = useState(item.title)
  const [isEdit, setEdit] = useState(false)
  const searchQuery = useTodoSelector(s => s.filter.searchQuery)

  function onDeleteHandler() {
    const msg = 'Вы уверены что хотите удалить этот элемент?'
    if (!window.confirm(msg)) return
    onDelete(item.id)
  }

  function onCompleteHandler() {
    onChange({ ...item, completed: !item.completed })
  }

  function onEditHandler() {
    onChange({ ...item, title })
  }

  return (
    <ListGroupItem>
      <div className="d-flex align-items-center justify-content-between gap-3">
        {isEdit
          ? (
            <form
              className="w-100"
              onSubmit={(e) => {
                e.preventDefault()
                onEditHandler()
              }}
            >
              <FormControl
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </form>
          )
          : (
            <div style={{ padding: '6px 0' }}>
              <div className="form-check">
                <input
                  type="checkbox"
                  id={`todo-item-${item.id}`}
                  className="form-check-input"
                  checked={item.completed}
                  onChange={onCompleteHandler}
                  disabled={disabled}
                />

                <label
                  title={`Created ${(new Date(item.created).toLocaleString())}`}
                  htmlFor={`todo-item-${item.id}`}
                  className="form-check-label"
                  dangerouslySetInnerHTML={{ __html: getTextWithFoundMark(item.title, searchQuery) }}
                />
              </div>
            </div>
          )}

        <div className="d-flex align-items-center gap-2">
          <button className="todos-delete-btn" onClick={() => setEdit(p => !p)}>
            <EditSvg width="16px" height="16px" />
          </button>

          {!isEdit
            ? (
              <button className="todos-delete-btn" onClick={onDeleteHandler}>
                <CloseSvg width="20px" height="20px" color="var(--bs-danger)" />
              </button>
            )
            : (
              <button className="todos-delete-btn" onClick={onEditHandler}>
                <CheckSvg width="20px" height="20px" color="var(--bs-success)" />
              </button>
            )
          }
        </div>
      </div>
    </ListGroupItem>
  )
}

export default TodoItem
