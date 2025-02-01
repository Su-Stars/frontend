import type { Pool } from '@/types/pools'
import Image from 'next/image'
import Link from 'next/link'
import NoImage from '@/components/common/no-image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface PoolCardProps {
  pool: Pool
}

export default function PoolCard({ pool }: PoolCardProps) {
  return (
    <Link href={`/pools/${pool.id}`}>
      <Card className="flex h-40 p-0 transition hover:opacity-90">
        <div className="h-full w-40">
          {pool?.thumbnail ? (
            <Image
              src={pool?.thumbnail}
              alt="이미지"
              width={70}
              height={70}
              className="h-full rounded-l-lg object-cover"
            />
          ) : (
            <NoImage className="h-full w-full rounded-l-lg text-sm" />
          )}
        </div>
        <div className="flex flex-1 flex-col justify-center p-4">
          <CardTitle className="text-lg hover:underline">{pool.name}</CardTitle>
          <CardDescription className="text-sm">
            {pool.address.split(' ').slice(0, 4).join(' ')}
          </CardDescription>
        </div>
      </Card>
    </Link>
  )
}
