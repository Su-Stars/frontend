import { REGION } from '@/lib/constants'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

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
  const queryClient = useQueryClient()

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

  // Prefetching 로직
  useEffect(() => {
    if (!accessToken) return

    const prefetchDistricts = async () => {
      for (let i = 0; i < REGION.length; i++) {
        await queryClient.prefetchQuery({
          queryKey: ['sgis-district', REGION[i].code],
          queryFn: async () => {
            try {
              const res = await fetch(`/api/sgis-district?cd=${REGION[i].code}`)
              if (!res.ok) {
                throw new Error('Network response was not ok')
              }
              return res.json()
            } catch (error) {
              console.log(error)
            }
          },
        })
      }
    }
    prefetchDistricts()
  }, [accessToken])

  return { districts, isLoading }
}
