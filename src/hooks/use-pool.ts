import { useQuery } from '@tanstack/react-query'
import { getPool } from '@/actions/pool'

interface usePoolParams {
  poolId: number
}

export const usePool = ({ poolId }: usePoolParams) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['pool', poolId],
    queryFn: async () => getPool(poolId),
  })

  return {
    data,
    isPending,
    isError,
    error,
  }
}
