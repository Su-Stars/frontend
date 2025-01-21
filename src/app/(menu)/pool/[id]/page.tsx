import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import PoolPage from '@/components/pages/pool-page'
import { getPool } from '@/action/get-pool'
import { Pool as IPool } from '@/hooks/useSearch'
import Error from '@/app/error'

export default async function Pool({ params }: { params: { id: string } }) {
  const { id } = params
  const queryClient = new QueryClient()

  try {
    await queryClient.prefetchQuery<IPool>({
      queryKey: ['posts'],
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
