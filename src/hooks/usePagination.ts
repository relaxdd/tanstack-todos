import { useMemo } from 'react'

const range = (start: number, end: number): number[] => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

interface UsePaginationProps {
  total: number,
  limit: number,
  page: number,
  siblings?: number,
  dot?: string
}

type UsePagination = ((config: UsePaginationProps) => string[])

const usePagination: UsePagination = ({ total, limit, page, siblings = 1, dot = '…' }) => {
  const pagination = useMemo(() => {
    const totalPageCount = Math.ceil(total / limit)

    // Pages count is determined as siblings_count + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblings + 5

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(page - siblings, 1)
    const rightSiblingIndex = Math.min(page + siblings, totalPageCount)

    /*
      We do not want to show dots if there is only one position left
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblings
      const leftRange = range(1, leftItemCount)

      return [...leftRange, dot, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblings
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      )
      return [firstPageIndex, dot, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, dot, ...middleRange, dot, lastPageIndex]
    }

    return []
  }, [total, limit, siblings, page])

  return pagination && pagination.map(it => String(it))
}

export { usePagination }
