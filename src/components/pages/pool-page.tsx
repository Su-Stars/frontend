'use client'

import { usePool } from '@/hooks/usePool'
import { Button } from '../ui/button'
import { LuChevronLeft } from 'react-icons/lu'
import Link from 'next/link'
import { useReviews } from '@/hooks/useReviews'
import PoolDetail from '../pool/pool-detail'
import PoolReview from '../pool/pool-review'

interface PoolPageParams {
  poolId: string
}

export default function PoolPage({ poolId }: PoolPageParams) {
  const { pool, isLoading, isError } = usePool({ poolId })
  const { data: poolReviews } = useReviews({ poolId })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading pool data</div>
  }

  return (
    <div className="flex flex-col space-y-10">
      <header className="flex w-full items-center gap-4 border-b-slate-200 bg-white">
        <Button
          size="icon"
          className="bg-transparent text-black shadow-none"
          asChild
        >
          <Link href="/">
            <LuChevronLeft />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold">{pool?.name}</h2>
      </header>

      {pool && <PoolDetail pool={pool} />}

      {/* 리뷰 섹션 */}
      {poolReviews && <PoolReview poolReviews={poolReviews} poolId={poolId} />}

      <section>{/* 지도 */}</section>
    </div>
  )
}
