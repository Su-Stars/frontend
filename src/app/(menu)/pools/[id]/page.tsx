import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import PoolPage from '@/components/pages/pool-page'
import { getPool } from '@/actions/get-pool'
import { Pool as IPool } from '@/hooks/useSearch'
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = (await params).id

  // fetch data
  const response = await fetch(`https://nest-aws.site/api/v1/pools/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }).then((res) => res.json())

  const pool = response.data[0]

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: pool.name,
    //TODO 후에 이미지를 추가합니다.
    openGraph: {
      images: [...previousImages],
    },
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
