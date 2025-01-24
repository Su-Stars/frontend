import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import PoolPage from '@/components/pages/pool-page'
import { getPool } from '@/actions/get-pool'
import { Pool as IPool } from '@/hooks/useSearch'

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
