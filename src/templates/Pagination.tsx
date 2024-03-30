import { usePagination } from '../hooks/usePagination.ts'
import { useCallback } from 'react'

type PagSchema = ({ type: 'page' | 'link', page: number | string } | { type: 'dot' })

interface IPagProps {
  page: number,
  total: number,
  limit: number,
  changePage: (page: number) => void
  dotSymbol?: string,
}

const Pagination = ({ page, total, limit, changePage, dotSymbol = '…' }: IPagProps) => {
  const pagination = usePagination({ page, total, limit, dot: dotSymbol })!

  const getTemplatePagination = useCallback(() => {
    return pagination.map<PagSchema>(it => {
      return it === dotSymbol
        ? { type: 'dot' }
        : { type: String(page) === it ? 'page' : 'link', page: it }
    })
  }, [pagination])

  function togglePage(isNext: boolean) {
    if (!isNext && page === 1) return
    if (isNext && page * limit >= total) return
    changePage(isNext ? page + 1 : page - 1)
  }

  return (
    <nav>
      <ul className="pagination m-0">
        <li
          className={`page-item${page === 1 ? ' disabled' : ''}`}
          onClick={() => togglePage(false)}
        >
          <span className="page-link cursor-pointer">Prev</span>
        </li>

        {getTemplatePagination().map((it, i) => {
          switch (it.type) {
            case 'dot':
              return (
                <li className="page-item" key={i}>
                  <span className="page-link">{dotSymbol}</span>
                </li>
              )
            case 'link':
              return (
                <li className="page-item" key={i} onClick={() => changePage(+it.page)}>
                  <span className="page-link cursor-pointer">{it.page}</span>
                </li>
              )
            case 'page':
              return (
                <li className="page-item active" aria-current="page" key={i}>
                  <span className="page-link">{it.page}</span>
                </li>
              )
          }
        })}

        <li
          className={`page-item${(page * limit >= total) ? ' disabled' : ''}`}
          onClick={() => togglePage(true)}
        >
          <span className="page-link cursor-pointer">Next</span>
        </li>
      </ul>
    </nav>
  )
}

export { Pagination }
