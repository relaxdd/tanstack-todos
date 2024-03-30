import { numeric } from '../types'

function makeQuery(obj: Record<string, numeric | numeric[] | undefined>) {
  if (!Object.keys(obj).length) return ''
  const s = new URLSearchParams()

  for (const key in obj) {
    if (!obj[key]) continue

    if (!Array.isArray(obj[key]))
      s.append(key, String(obj[key]!))
    else {
      for (const item of obj[key] as numeric[]) {
        s.append(key, String(item))
      }
    }
  }

  return s.toString()
}

export { makeQuery }
