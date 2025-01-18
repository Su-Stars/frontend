import { useQuery } from '@tanstack/react-query'
import { Pool } from './useSearch'

interface useNearbyParams {
  latitude: number
  longitude: number
  radius?: number
}

interface UseNearbyResponse {
  status: string
  message: string
  pools: Pool[]
}

export const useNearby = ({
  latitude,
  longitude,
  radius = 10,
}: useNearbyParams) => {
  const { data: nearbySwimmingPools, isLoading } = useQuery<UseNearbyResponse>({
    queryKey: [latitude, longitude, radius],
    queryFn: async () => {
      const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        radius: radius.toString(),
      })

      try {
        const res = await fetch(
          `http://localhost:9999/api/v1/pools/nearby?${params.toString()}`,
        )
        const json = await res.json()
        return json.data
      } catch (error) {
        console.log(error)
        return defaultResponse
      }
    },
    enabled: !!latitude && !!longitude,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  })
  console.log(nearbySwimmingPools)
  return { nearbySwimmingPools, isLoading }
}
