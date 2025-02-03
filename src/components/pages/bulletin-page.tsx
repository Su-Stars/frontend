'use client'

import { useBulletin } from '@/hooks/use-bulletin'
import { useIntersectionObserver } from '@/hooks/use-intersectionObserver'
import BulletinList from '../bulletin/bulletin-list'

export default function BulletinPage() {
  const {
    records,
    fetchNextPage,
    hasNextPage,

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
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">오수완</h2>

      {<BulletinList records={records} />}
      {hasNextPage && (
        <div ref={moreRef} className="py-4 text-center text-gray-500">
          {isFetchingNextPage ? '로딩 중...' : '더 보기'}
        </div>
      )}
    </div>
  )
}
