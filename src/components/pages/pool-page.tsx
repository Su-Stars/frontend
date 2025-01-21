'use client'

import PoolDetail from '../pool/pool-detail'
import PoolReview from '../pool/pool-review'
import PoolKaKaoMap from '../pool/pool-kakao-map'

interface PoolPageParams {
  poolId: string
}

export default function PoolPage({ poolId }: PoolPageParams) {
  return (
    <div className="flex flex-col space-y-10">
      <PoolDetail poolId={poolId} />
      <PoolReview poolId={poolId} />
      <PoolKaKaoMap poolId={poolId} />
    </div>
  )
}
