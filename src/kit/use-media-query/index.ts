import { useState, useEffect } from "preact/hooks";

export const size = {
  S: '200px',
  M: '600px',
  L: '1024px',
}

export const Breakpoint = {
  MaxWidth: {
    S: `(max-width: ${size.S})`,
    M: `(max-width: ${size.M})`,
    L: `(max-width: ${size.L})`,
  },
  MinWidth: {
    S: `(min-width: ${size.S})`,
    M: `(min-width: ${size.M})`,
    L: `(min-width: ${size.L})`,
  }
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