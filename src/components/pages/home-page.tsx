'use client'

import HomeKakaoMap from '../home/home-kakao-map'
import HomeRegionFilter from '../home/home-region-filter'
import { useIntersectionObserver } from '@/hooks/use-intersectionObserver'
import { useSearch } from '@/hooks/use-search'
import HomePoolList from '../home/home-pool-list'
import { useSearchStore } from '@/stores/search-store'
import { useEffect, useRef, useState } from 'react'
import { Coordinates } from '@/types/coordinate'
import useCenterStore from '@/stores/center-store'
import { DEFAULT_MAP_CENTER } from '@/lib/constants'
import HomeSearchInput from '../home/home-search-input'
import { Button } from '../ui/button'
import { FaArrowUp } from 'react-icons/fa'
import { useThrottle } from '@/hooks/use-throttle'
import { cn } from '@/lib/utils'

export default function HomePage() {
  const [showScrollButton, setShowScrollButton] = useState(true)
  const { region, keyword } = useSearchStore()
  const { setCenter } = useCenterStore()
  const {
    searchResults,
    hasNextPage,
    fetchNextPage,
    total,
    isFetchingNextPage,
    isPending,
  } = useSearch({
    region,
    keyword,
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCenter: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        setCenter(newCenter)
      },
      // 에러가 발생하면 서울역으로 설정
      (error) => {
        setCenter(DEFAULT_MAP_CENTER)
      },
    )
  }, [])

  useEffect(() => {
    const handleScroll = useThrottle(() => {
      setShowScrollButton(window.scrollY > 30)
    }, 200) // 200ms 스로틀링

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const option = {
    threshold: 0.5,
    rootMargin: '0px',
  }

  const moreRef = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }, option)

  const clickUpButton = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className="flex flex-col space-y-4">
      <h2>수영장 찾기</h2>
      <HomeKakaoMap searchResults={searchResults} />
      <HomeRegionFilter />
      <HomeSearchInput />
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
      <HomePoolList
        total={total}
        searchResults={searchResults}
        isPending={isPending}
      />

      {hasNextPage && (
        <div ref={moreRef} className="py-4 text-center text-gray-500">
          {isFetchingNextPage ? '로딩 중...' : '더 보기'}
        </div>
      )}
    </div>
  )
}
