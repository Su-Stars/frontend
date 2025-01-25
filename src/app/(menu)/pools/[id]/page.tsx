import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import PoolPage from '@/components/pages/pool-page'
import { getPool } from '@/actions/get-pool'
import { Pool as IPool } from '@/hooks/useSearch'
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

export default async function Pool({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  try {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery<IPool>({
      queryKey: ['pool', id],
      queryFn: () => getPool(id),
    })

    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PoolPage poolId={id} />
      </HydrationBoundary>
    )
  } catch (error: any) {
    console.error(error)
  }
}
