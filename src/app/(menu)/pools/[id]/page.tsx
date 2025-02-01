import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import PoolPage from '@/components/pages/pool-page'
import type { Metadata } from 'next'
import type { PoolDetail } from '@/types/pools'
import { notFound } from 'next/navigation'
import { getPool } from '@/actions/pool'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const poolId = Number((await params).id)
  const queryClient = new QueryClient()

  try {
    await queryClient.prefetchQuery({
      queryKey: ['pool', poolId],
      queryFn: () => getPool(poolId),
    })
    const pool = queryClient.getQueryData<PoolDetail>(['pool', poolId])

    if (!pool) {
      notFound()
    }

    // TODO : OG용 이미지 추가하기
    return {
      title: pool.name,
      description: pool.description || '수영장 상세 정보',
      openGraph: {
        title: pool.name,
        description: pool.description || '수영장 상세 정보',
      },
    }
  } catch (error) {
    throw error
  }
}

export default async function Pool({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const poolId = Number((await params).id)
  const pool = await getPool(poolId)

  return <PoolPage pool={pool} />
}
