import { useQuery } from '@tanstack/react-query'
import { getMe } from '@/actions/user'

interface useMeParams {
  user: boolean
}

export const useMe = ({ user }: useMeParams) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['me'],
    queryFn: () => getMe(),
    enabled: user,
  })

  return { data, isLoading, isError, error }
}
