import { Pool } from '@/hooks/useSearch'
import Image from 'next/image'
import Link from 'next/link'

interface PoolCardProps {
  pool: Pool
}

export default function PoolCard({ pool }: PoolCardProps) {
  return (
    <div>
      <Link className="flex gap-4" href={`/pools/${pool.id}`}>
        <Image src={pool.thumbnail} alt="이미지" width={70} height={70} />
        <div className="flex-col gap-4">
          <div className="text-lg font-semibold">{pool.name}</div>
          <div className="text-sm text-gray-400">{pool.address}</div>
        </div>
      </Link>
    </div>
  )
}
