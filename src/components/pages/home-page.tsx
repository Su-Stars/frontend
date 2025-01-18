'use client'

import HomeMapWithSuspense from '@/components/home/home-kakao-map'
import HomeSearch from '@/components/home/home-search'

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">수영장 검색</h2>
      <HomeMapWithSuspense />
      <HomeSearch />
    </div>
  )
}
