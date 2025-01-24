import { useQuery } from '@tanstack/react-query'
import { Pool } from './useSearch'

interface UseNearbyResponse {
  status: string
  message: string
  pools: Pool[]
}

interface UseNearbyParams {
  latitude: number
  longtitude: number
  radius?: number
}

export const useNearby = ({
  latitude,
  longtitude,
  radius = 5,
}: UseNearbyParams) => {
  const {
    data: nearbySwimmingPools,
    isLoading: isNearbyLoading,
    isError: isNearbyError,
    error: nearbyError,
  } = useQuery<UseNearbyResponse>({
    queryKey: [latitude, longtitude, radius],
    queryFn: async () => {
      const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longtitude.toString(),
        radius: radius.toString(),
      })

      try {
        const res = await fetch(
          `http://localhost:9999/api/v1/pools/nearby?${params.toString()}`,
        )
        const json = await res.json()
        return json.data
      } catch (error) {
        throw new Error('Failed to fetch nearby swimming pools')
      }
    },
    enabled: !!latitude && !!longtitude,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  })
  // console.log(nearbySwimmingPools)
  return { nearbySwimmingPools, isNearbyLoading, isNearbyError, nearbyError }
}
