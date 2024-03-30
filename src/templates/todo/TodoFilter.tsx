import { defaultFilter, listOfLimits, useTodoDispatch, useTodoSelector } from '../../store/todoStore.ts'
import { useDebouncedCallback } from 'use-debounce'
import { CloseSvg } from '../svg/CloseSvg.tsx'
import { useRef } from 'react'

const TodoFilter = () => {
  const { onlyCurrent, showLimit, searchQuery } = useTodoSelector(s => s.filter)
  const { setFilter, setState } = useTodoDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const debounced = useDebouncedCallback((value) => {
    setFilter('searchQuery', value)
  }, 500)

  return (
    <div className="d-flex align-items-center gap-2">
      <div>
        <select
          className="form-control"
          value={showLimit}
          onChange={({ target }) => setFilter('showLimit', +target.value)}
        >
          {listOfLimits.map((it) => (
            <option value={it.value} key={it.id}>{it.label}</option>
          ))}
        </select>
      </div>

      <div>
        <select
          className="form-control"
          value={+onlyCurrent}
          onChange={({ target }) => {
            setFilter('onlyCurrent', !!+target.value)
          }}
        >
          <option value="1">Только текущие</option>
          <option value="0">Показывать все</option>
        </select>
      </div>

      <div>
        <div
          className="d-inline-flex align-items-center"
          style={{ position: 'relative' }}
        >
          <input
            type="search"
            className="form-control"
            style={{ paddingRight: '1.5rem' }}
            placeholder="Поиск по задачам"
            ref={inputRef}
            onChange={({ target }) => {
              debounced(target.value)
            }}
          />

          <button
            className="btn-reset"
            style={{ position: 'absolute', right: '.5rem', cursor: 'pointer' }}
            onClick={() => {
              inputRef.current!.value = ''
              setFilter('searchQuery', '')
            }}
            disabled={!searchQuery.length}
          >
            <CloseSvg width="18px" height="18px" />
          </button>
        </div>
      </div>

      <input
        type="button"
        className="btn btn-primary"
        value="Сбросить"
        onClick={() => setState({ filter: defaultFilter })}
      />
    </div>
  )
}

export default TodoFilter
