'use client'

import { lazy, Suspense } from 'react'
import { LuLoaderCircle } from 'react-icons/lu'

const HomeKakaoMap = lazy(() => import('@/components/home/home-kakao-map'))
const HomeSearch = lazy(() => import('@/components/home/home-search'))

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-3">
      <h2>수영장 검색</h2>
      <Suspense fallback={<LuLoaderCircle />}>
        <HomeKakaoMap />
      </Suspense>
      <HomeSearch />
    </div>
  )
}
