import { Pool } from '@/hooks/use-search'
import Image from 'next/image'
import Link from 'next/link'
import NoImage from '../common/no-image'

interface PoolCardProps {
  pool: Pool
}

export default function PoolCard({ pool }: PoolCardProps) {
  return (
    <div>
      <Link className="flex gap-4" href={`/pools/${pool.id}`}>
        {pool?.thumbnail ? (
          <Image src={pool?.thumbnail} alt="이미지" width={70} height={70} />
        ) : (
          <NoImage className="h-[70px] w-[70px] text-sm" />
        )}
        <div className="flex-col gap-4">
          <div className="text-lg font-semibold">{pool.name}</div>
          <div className="text-sm text-gray-400">{pool.address}</div>
        </div>
      </Link>
    </div>
  )
}
