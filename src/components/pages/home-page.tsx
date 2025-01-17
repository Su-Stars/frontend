'use client'

import HomeKaKaoMap from '../home/home-map'
import HomeSearch from '../home/home-search'

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">수영장 검색</h2>
      <HomeKaKaoMap />
      <HomeSearch />
    </div>
  )
}
