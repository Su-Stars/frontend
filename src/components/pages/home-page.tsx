'use client'

import { lazy, Suspense } from 'react'
import { LuLoaderCircle } from 'react-icons/lu'

const HomeKakaoMap = lazy(() => import('@/components/home/home-kakao-map'))
const HomeSearch = lazy(() => import('@/components/home/home-search'))

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">수영장 검색</h2>
      <Suspense
        fallback={
          <div className="flex h-[200px] w-full items-center justify-center rounded-lg bg-gray-400">
            <LuLoaderCircle />
          </div>
        }
      >
        <HomeKakaoMap />
      </Suspense>
      <Suspense></Suspense>
      <HomeSearch />
    </div>
  )
}
