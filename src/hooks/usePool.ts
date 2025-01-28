import { useQuery } from '@tanstack/react-query'
import { Pool } from './use-search'
import { getPool } from '@/actions/get-pool'

interface usePoolParams {
  poolId: number
}

export const usePool = ({ poolId }: usePoolParams) => {
  const {
    data: pool,
    isLoading,
    isError,
    error,
  } = useQuery<Pool>({
    queryKey: ['pool', poolId],
    queryFn: () => getPool(poolId),
  })

  return { pool, isLoading, isError, error }
}
