import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import PoolPage from '@/components/pages/pool-page'
import type { Metadata } from 'next'
import type { Pool } from '@/types/pool'
import { notFound } from 'next/navigation'
import { getPool } from '@/actions/pool'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const poolId = Number(params.id)
  const queryClient = new QueryClient()

  try {
    await queryClient.prefetchQuery({
      queryKey: ['pool', poolId],
      queryFn: () => getPool(poolId),
    })
    const pool = queryClient.getQueryData<Pool>(['pool', poolId])

    if (!pool) {
      notFound()
    }

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
  const queryClient = new QueryClient()

  queryClient.prefetchQuery({
    queryKey: ['pool', poolId],
    queryFn: () => getPool(poolId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PoolPage poolId={poolId} />
    </HydrationBoundary>
  )
}
