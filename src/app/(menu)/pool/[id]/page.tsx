import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import PoolPage from '@/components/pages/pool-page'
import { getPool } from '@/action/get-pool'
import { Pool as IPool } from '@/hooks/useSearch'

export default async function Pool({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const queryClient = new QueryClient()

  try {
    await queryClient.prefetchQuery<IPool>({
      queryKey: ['pool', id],
      queryFn: () => getPool(id),
    })
  } catch (error) {
    console.log(error)
    return <div>에러 발생</div>
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PoolPage poolId={id} />
    </HydrationBoundary>
  )
}
