import { useEffect, useRef } from 'react'

type Callback = (entries: IntersectionObserverEntry[]) => void

interface ObserverOptions {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
}

const defaultOptions: ObserverOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
}

export const useIntersectionObserver = (
  callback: Callback,
  options: ObserverOptions = defaultOptions,
) => {
  const targetRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options)

    if (targetRef.current) {
      observer.observe(targetRef.current)
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current)
      }
    }
  }, [callback, options])
  return targetRef
}
