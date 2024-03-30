import { FormControl } from 'react-bootstrap'
import { FormEvent, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TodosApiService } from '../../api/TodosApiService.ts'
import { QUERY_SLUG } from '../../defines.ts'

const TodoForm = () => {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')

  const { mutate, isPending } = useMutation({
    mutationFn: () => TodosApiService.create(title),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_SLUG.TODO] })
      setTitle('')
    },
    onError: (err) => {
      console.error(err)
      alert(err.message)
    }
  })

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate()
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="d-flex align-items-center gap-3">
        <FormControl
          type="text"
          placeholder="Описание новой задачи"
          value={title}
          required
          onChange={({ target }) => setTitle(target.value)}
        />

        <input
          type="submit"
          className="btn btn-primary"
          value="Добавить"
          disabled={isPending}
        />
      </div>
    </form>
  )
}

export default TodoForm
