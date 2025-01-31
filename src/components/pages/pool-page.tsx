'use client'

import PoolDetail from '../pool/pool-detail'
import { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import type { Pool } from '@/types/pool'
import { useQuery } from '@tanstack/react-query'
import { getPool } from '@/actions/pool'

const ReviewsPage = lazy(() => import('@/components/pages/reviews-page'))
const PoolKaKaoMap = lazy(() => import('@/components/pool/pool-kakao-map'))

interface PoolPageParams {
  poolId: number
}

export default function PoolPage({ poolId }: PoolPageParams) {
  const { data, isPending, isError, error } = useQuery<Pool>({
    queryKey: ['pool', poolId],
    queryFn: () => getPool(poolId),
  })

  if (isPending) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="flex flex-col space-y-4">
      <PoolDetail pool={data as Pool} />
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense
          fallback={<div className="flex flex-col gap-2">리뷰 로딩</div>}
        >
          <ReviewsPage preview poolId={poolId} />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Suspense
          fallback={<div className="flex flex-col gap-2">지도 로딩</div>}
        >
          <PoolKaKaoMap pool={data as Pool} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
