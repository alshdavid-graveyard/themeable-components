import { useState, useEffect } from "preact/hooks";

export const Breakpoint = {
  S: '(min-width: 200px)',
  M: '(min-width: 200px)',
  L: '(min-width: 600px)',
}

export const useMediaQuery = (query: string) => {
  const [ matches, setMatches ] = useState(false)

  useEffect(() => {
    const listener = (list: MediaQueryListEvent | MediaQueryList) => setMatches(list.matches)
    const computedQuery = window.matchMedia(query)
    computedQuery.addListener(listener)
    listener(computedQuery)
    return () => computedQuery.removeListener(listener)
  })

  return matches
}