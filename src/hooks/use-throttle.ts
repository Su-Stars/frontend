export const useThrottle = (callback: () => void, delay = 200) => {
  let timeId: ReturnType<typeof setTimeout> | null

  return () => {
    if (timeId) return
    timeId = setTimeout(() => {
      callback()
      timeId = null
    }, delay)
  }
}
