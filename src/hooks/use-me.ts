import { useQuery } from '@tanstack/react-query'

interface useMeParams {
  user: boolean
}

export const useMe = ({ user }: useMeParams) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await fetch('https://nest-aws.site/api/v1/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const json = await response.json()

      if (!response.ok) {
        throw new Error(`[${response.status}] ${json.message}`)
      }

      return json.data
    },
    enabled: user,
  })

  return { data, isLoading, isError }
}
