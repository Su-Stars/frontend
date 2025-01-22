'use client'

import PoolDetail from '../pool/pool-detail'
import PoolKaKaoMap from '../pool/pool-kakao-map'
import { usePool } from '@/hooks/usePool'
import { Skeleton } from '../ui/skeleton'
import { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const ReviewsPage = lazy(() => import('@/components/pages/reviews-page'))

interface PoolPageParams {
  poolId: string
}

export default function PoolPage({ poolId }: PoolPageParams) {
  const { pool, isLoading, isError } = usePool({ poolId })

  if (isError || !pool) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>
  }

  if (isLoading) {
    return (
      <section className="flex flex-col gap-2">
        <header className="flex w-full items-center gap-4 border-b-slate-200 bg-white">
          <Skeleton className="h-4 w-full" />
          <h2 className="text-2xl font-bold">{pool?.name}</h2>
        </header>
        <div className="relative h-[200px] w-full">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="flex flex-col gap-2 *:flex *:items-center *:gap-4">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </section>
    )
  }
  return (
    <div className="flex flex-col space-y-10">
      <PoolDetail pool={pool} />
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense
          fallback={<div className="flex flex-col gap-2">리뷰 로딩</div>}
        >
          <ReviewsPage preview poolId={poolId} />
        </Suspense>
      </ErrorBoundary>
      <PoolKaKaoMap pool={pool} />
    </div>
  )
}
