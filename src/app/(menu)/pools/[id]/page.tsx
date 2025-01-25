import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import PoolPage from '@/components/pages/pool-page'
import { getPool } from '@/actions/get-pool'
import { getBookmark } from '@/actions/get-bookmark'

interface PrefetchDataProps {
  queryClient: QueryClient
  id: string
  queryKey: string
  queryFn: (id: string) => void
}

async function prefetchData({
  queryClient,
  id,
  queryKey,
  queryFn,
}: PrefetchDataProps) {
  try {
    await queryClient.prefetchQuery({
      queryKey: [queryKey, id],
      queryFn: () => queryFn(id),
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
  const id = (await params).id
  const queryClient = new QueryClient()

  // 상세 정보 프리패칭
  await prefetchData({ queryClient, id, queryKey: 'pool', queryFn: getPool })

  // 북마크 정보 프리패칭
  await prefetchData({
    queryClient,
    id,
    queryKey: 'bookmark',
    queryFn: getBookmark,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PoolPage poolId={id} />
    </HydrationBoundary>
  )
}
