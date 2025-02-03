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

async function prefetchPool(poolId: number) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['pool', poolId],
    queryFn: () => getPool(poolId),
  })

  return {
    queryClient,
    pool: queryClient.getQueryData<PoolDetail>(['pool', poolId]),
  }
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const poolId = Number((await params).id)

  try {
    const { pool } = await prefetchPool(poolId)

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
    console.error(error)
    notFound()
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const poolId = Number((await params).id)
  const { queryClient } = await prefetchPool(poolId)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PoolPage poolId={poolId} />
    </HydrationBoundary>
  )
}
