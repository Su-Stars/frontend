'use client'

import { useBulletin } from '@/hooks/use-bulletin'
import BulletinItem from './bulletin-item'
import { useEffect, useRef } from 'react'
import { useIntersectionObserver } from '@/hooks/use-intersectionObserver'

export default function BulletinList() {
  const {
    bulletins,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useBulletin()

  const option = {
    threshold: 0.5,
    rootMargin: '0px',
  }

  const moreRef = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }, option)

  return (
    <div className="flex flex-col gap-6">
      {bulletins.map((item, index) => (
        <BulletinItem item={item} key={index} />
      ))}

      {/* 다음 페이지가 있을 때만 더보기 표시 */}
      {hasNextPage && (
        <div ref={moreRef} className="py-4 text-center text-gray-500">
          {isFetchingNextPage ? '로딩 중...' : '더 보기'}
        </div>
      )}
    </div>
  )
}
