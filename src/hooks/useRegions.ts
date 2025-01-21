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

export interface DistrictResponse {
  result: Result[]
}

const defaultResponse: Result = {
  y_coor: '0',
  full_addr: '0',
  x_coor: '0',
  addr_name: '0',
  cd: '0',
}

export const useRegions = ({ code }: useRegionsParams) => {
  // sgis accessToken 받아오기
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

  // 도 별로 지역구 검색
  const {
    data: districts,
    isLoading: isRegionLoading,
    isError,
    error,
  } = useQuery<DistrictResponse>({
    queryKey: ['sgis-district', code],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/sgis-district?cd=${code}`)

        if (!res.ok) {
          throw new Error('Network response was not ok')
        }
        const json = await res.json()

        return json
      } catch (error) {
        console.log(error)

        return defaultResponse
      }
    },
    enabled: !!accessToken && !!code,
  })

  return { districts, isRegionLoading, isError, error }
}
