import { useThrottle } from '@/hooks/use-throttle'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'
import { Button } from '../ui/button'

export default function HomeUpButton() {
  const [showScrollButton, setShowScrollButton] = useState(true)
  useEffect(() => {
    const handleScroll = useThrottle(() => {
      setShowScrollButton(window.scrollY > 30)
    }, 1000) // 200ms 스로틀링

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const clickUpButton = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  return (
    <Button
      className={cn(
        'fixed bottom-5 right-[31%] z-10 h-12 w-12 rounded-full',
        showScrollButton ? '' : 'hidden',
      )}
      variant="primary"
      onClick={clickUpButton}
    >
      <FaArrowUp className="h-20 w-20" />
    </Button>
  )
}
