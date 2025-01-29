'use client'

import HomeKakaoMap from '../home/home-kakao-map'
import HomeSearch from '../home/home-search'

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">수영장 검색</h2>
      <HomeKakaoMap />
      <HomeSearch />
    </div>
  )
}
