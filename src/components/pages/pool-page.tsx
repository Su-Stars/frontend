'use client'

import PoolDetail from '../pool/pool-detail'
import PoolKaKaoMap from '../pool/pool-kakao-map'
import { usePool } from '@/hooks/usePool'
import { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const ReviewsPage = lazy(() => import('@/components/pages/reviews-page'))

interface PoolPageParams {
  poolId: string
}

export default function PoolPage({ poolId }: PoolPageParams) {
  const { pool, isError } = usePool({ poolId })

  if (isError || !pool) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>
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
