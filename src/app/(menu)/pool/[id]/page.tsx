import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import PoolPage from '@/components/pages/pool-page'
import { getPool } from '@/action/get-pool'
import { Pool as IPool } from '@/hooks/useSearch'
import { server } from '@/mocks/node'

// 서버 사이드에서 msw 서버 시작
if (typeof window === 'undefined') {
  server.listen()
}

export default async function Pool({ params }: { params: { id: string } }) {
  const { id } = params
  console.log(id)
  const queryClient = new QueryClient()

  try {
    await queryClient.prefetchQuery<IPool>({
      queryKey: ['pool', id],
      queryFn: () => getPool(id),
    })
  } catch (error) {
    return <div>에러 발생</div>
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PoolPage poolId={id} />
    </HydrationBoundary>
  )
}
