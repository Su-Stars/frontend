import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import PoolPage from '@/components/pages/pool-page'
import { getPool } from '@/actions/get-pool'
import { getBookmark } from '@/actions/bookmark'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const id = (await params).id
    const response = await fetch(`https://nest-aws.site/api/v1/pools/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    if (!response.ok) {
      if (response.status === 404) {
        notFound()
      }
    }

    const data = await response.json()
    const pool = data.data?.[0]

    if (!pool) {
      notFound()
    }

    const previousImages = (await parent).openGraph?.images || []

    return {
      title: pool.name,
      description: pool.description || '수영장 상세 정보',
      openGraph: {
        images: [...previousImages],
        title: pool.name,
        description: pool.description || '수영장 상세 정보',
      },
    }
  } catch (error) {
    throw error
  }
}

interface PrefetchDataProps {
  queryClient: QueryClient
  poolId: number
  queryKey: string
  queryFn: (id: number) => void
}

async function prefetchData({
  queryClient,
  poolId,
  queryKey,
  queryFn,
}: PrefetchDataProps) {
  try {
    await queryClient.prefetchQuery({
      queryKey: [queryKey, poolId],
      queryFn: () => queryFn(poolId),
    })
  } catch (error) {
    console.log(error)
    return <div>에러 발생</div>
  }
}

export default async function Pool({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const poolId = Number((await params).id)
  const queryClient = new QueryClient()

  await prefetchData({
    queryClient,
    poolId,
    queryKey: 'pool',
    queryFn: getPool,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PoolPage poolId={poolId} />
    </HydrationBoundary>
  )
}
