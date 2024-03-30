export function splitWordByFind(text: string, query: string) {
  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()

  const entry = lowerText.indexOf(lowerQuery)

  return {
    start: text.slice(0, entry),
    found: text.slice(entry, entry + query.length),
    finish: text.slice(entry + query.length)
  }
}

export function getTextWithFoundMark(text: string, query: string) {
  if (!query) return text
  const { start, found, finish } = splitWordByFind(text, query)
  return `${start}<mark>${found}</mark>${finish}`
}
