import { ITodo } from '../schemes/todos.ts'
import { useMemo } from 'react'

interface IParsedTodos {
  current: ITodo[],
  completed: ITodo[],
}

function useParsedTodos(data: ITodo[] | undefined) {
  const initial: IParsedTodos = {
    current: [],
    completed: []
  }

  return useMemo(() => {
    if (!data || !data.length) return initial

    return data.reduce<IParsedTodos>((acc, it) => {
      const key = it.completed ? 'completed' : 'current'
      acc[key].push(it)
      return acc
    }, initial)
  }, [data])
}

export { useParsedTodos }
