import { create } from 'zustand'
import { useStoreWithEqualityFn } from 'zustand/traditional'

type ITodoState = Pick<ITodoStore, 'page' | 'total' | 'filter'>

interface ITodoStore {
  page: number,
  total: number,
  filter: {
    showLimit: number,
    onlyCurrent: boolean,
    searchQuery: string,
  },
  setState: (value: Partial<ITodoState> | ((prev: ITodoState) => ITodoState)) => void,
  setFilter: <T extends ITodoStore['filter'], K extends keyof T>(key: K, value: T[K]) => void
}

const listOfLimits = [
  { id: 1, value: 10, label: 'По 10 шт.' },
  { id: 2, value: 25, label: 'По 25 шт.' },
  { id: 3, value: 50, label: 'По 50 шт.' },
  { id: 4, value: 100, label: 'По 100 шт.' },
] as const

const defaultFilter = {
  showLimit: listOfLimits[1]!.value,
  onlyCurrent: true,
  searchQuery: ''
} as const

const todoStore = create<ITodoStore>((set) => ({
  page: 1,
  total: 0,
  filter: defaultFilter,
  setState: (state) => {
    set(prev => ({ ...prev, ...(typeof state === 'function' ? state(prev) : state) }))
  },
  setFilter: (key, value) => {
    set((prev) => ({ ...prev, page: 1, filter: { ...prev.filter, [key]: value } }))
  }
}))

function useTodoSelector<T>(
  selector: (state: ITodoStore) => T,
  equalityFn?: (left: T, right: T) => boolean,
): T {
  return useStoreWithEqualityFn(todoStore, selector, equalityFn)
}

function useTodoStore() {
  return useTodoSelector(({ page, filter, total }) => ({ page, filter, total }))
}

function useTodoDispatch() {
  return useTodoSelector(({ setState, setFilter }) => ({ setState, setFilter }))
}

export type {
  ITodoStore
}

export {
  listOfLimits,
  defaultFilter,
  useTodoSelector,
  useTodoDispatch,
  useTodoStore
}
