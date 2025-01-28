export const useDebounce = (callback: () => void, delay: number) => {
  let timeId: ReturnType<typeof setTimeout> | undefined

  return () => {
    if (timeId !== undefined) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      callback()
    }, delay)
  }
}
