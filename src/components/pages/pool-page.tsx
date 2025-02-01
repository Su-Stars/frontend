'use client'

import PoolDetail from '../pool/pool-detail'
import { PoolDetail as IPoolDetail } from '@/types/pools'
import ReviewsPage from './reviews-page'
import PoolKaKaoMap from '../pool/pool-kakao-map'

interface PoolPageParams {
  pool: IPoolDetail
}

export default function PoolPage({ pool }: PoolPageParams) {
  return (
    <div className="flex flex-col space-y-4">
      <PoolDetail pool={pool} />
      <ReviewsPage preview poolId={pool.id} />
      <PoolKaKaoMap pool={pool} />
    </div>
  )
}
