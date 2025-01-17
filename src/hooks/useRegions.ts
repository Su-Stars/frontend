import { useQuery } from '@tanstack/react-query'

interface useRegionsParams {
  code: string
}

interface Result {
  y_coor: string
  full_addr: string
  x_coor: string
  addr_name: string
  cd: string
}

interface DistrictResponse {
  result: Result[]
}

export const useRegions = ({ code }: useRegionsParams) => {
  const { data: accessToken } = useQuery({
    queryKey: ['sgis-auth'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/sgis-auth')

        if (!res.ok) {
          throw new Error('Network response was not ok')
        }

        const json = await res.json()
        return json.result.accessToken
      } catch (error) {
        console.log(error)
      }
    },
  })

  const { data: districts, isLoading } = useQuery<DistrictResponse>({
    queryKey: ['sgis-district', code],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/sgis-district?cd=${code}`)

        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        const json = await res.json()
        console.log(json)
        return json
      } catch (error) {
        console.log(error)
      }
    },
    enabled: !!accessToken && !!code,
  })

  return { districts, isLoading }
}
