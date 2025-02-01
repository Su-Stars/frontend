'use client'

import { useBulletin } from '@/hooks/use-bulletin'
import BulletinItem from './bulletin-item'
import { useEffect, useRef } from 'react'

export default function BulletinList() {
  const { bulletins, fetchNextPage, hasNextPage, isLoading } = useBulletin()
  const moreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const options = {
      root: null, // 뷰포트, Null일 땐 뷰포트는 브라우저창이 기준이 된다.
      rootMargin: '0px',
      threshold: 0.5, // 50%가 보일 때 콜백함수가 실행
    }

    const fetchCallback: IntersectionObserverCallback = (entries, observer) => {
      // 각 항목을 반복하며, 뷰포트와 교차하며 hasNextPage가 true인 경우,
      // fetchNextPage 함수를 호출하고 현재 대상 요소 관찰을 중지
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage?.()
          observer.unobserve(entry.target)
        }
      })
    }

    const observer = new IntersectionObserver(fetchCallback, options)

    // ref 객체가 마운트 될 때
    if (moreRef.current) {
      observer.observe(moreRef.current)
    }

    // ref 객체가 언마운트 될 때
    return () => {
      if (moreRef.current) {
        observer.unobserve(moreRef.current)
      }
    }
  }, [bulletins])

  return (
    <div className="flex flex-col gap-6">
      {bulletins.map((item, index) => (
        <BulletinItem item={item} key={index} />
      ))}

      {/*  */}
      {!isLoading && hasNextPage && (
        <div className="more" ref={moreRef}>
          ...
        </div>
      )}
    </div>
  )
}
