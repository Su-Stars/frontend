'use client'

import PoolDetail from '../pool/pool-detail'
import { ErrorBoundary } from 'react-error-boundary'
import type { PoolDetail as PoolDetailI } from '@/types/pools'
import { usePool } from '@/hooks/use-pool'
import { Separator } from '@/components/ui/separator'
import dynamic from 'next/dynamic'
import ReviewPreviewSkeleton from '@/app/(menu)/pools/[id]/reviews/_components/review-preview-skeleton'
import SkeletonPoolMap from '@/components/pool/skeleton-pool-map'
import ErrorFallback from '@/components/common/error-fallback'

const ReviewsPage = dynamic(() => import('@/components/pages/reviews-page'), {
  loading: () => <ReviewPreviewSkeleton />,
})

const PoolKaKaoMap = dynamic(() => import('@/components/pool/pool-kakao-map'), {
  loading: () => <SkeletonPoolMap />,
})

interface PoolPageParams {
  poolId: number
}

export default function PoolPage({ poolId }: PoolPageParams) {
  const { data, isPending, isError, error } = usePool({ poolId })

  return (
    <div className="flex flex-col space-y-4">
      <PoolDetail pool={data as PoolDetailI} />
      <Separator />
      <ErrorBoundary fallback={<ErrorFallback error={error} />}>
        <ReviewsPage preview poolId={poolId} />
      </ErrorBoundary>
      <Separator />
      <ErrorBoundary fallback={<ErrorFallback error={error} />}>
        <PoolKaKaoMap pool={data as PoolDetailI} />
      </ErrorBoundary>
    </div>
  )
}
