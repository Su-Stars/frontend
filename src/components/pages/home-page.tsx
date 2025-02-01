'use client'

import HomeKakaoMap from '../home/home-kakao-map'
import HomeRegionFilter from '../home/home-region-filter'
import { useIntersectionObserver } from '@/hooks/use-intersectionObserver'
import { useSearch } from '@/hooks/use-search'
import HomePoolList from '../home/home-pool-list'
import { useSearchStore } from '@/stores/search-store'

export default function HomePage() {
  const { region, keyword } = useSearchStore()
  const {
    searchResults,
    hasNextPage,
    fetchNextPage,
    total,
    isFetchingNextPage,
  } = useSearch({
    region,
    keyword,
  })

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
      <h2 className="text-2xl font-bold">수영장 검색</h2>
      <HomeKakaoMap searchResults={searchResults} />
      <HomeRegionFilter />
      <HomePoolList total={total} searchResults={searchResults} />
      {hasNextPage && (
        <div ref={moreRef} className="py-4 text-center text-gray-500">
          {isFetchingNextPage ? '로딩 중...' : '더 보기'}
        </div>
      )}
    </div>
  )
}
