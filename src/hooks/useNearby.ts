import { useQuery } from '@tanstack/react-query'
import { Pool } from './useSearch'
import useCenterStore from '@/stores/center-store'

interface UseNearbyResponse {
  status: string
  message: string
  pools: Pool[]
}

export const useNearby = () => {
  const { center } = useCenterStore()
  console.log(center)
  const radius = 5

  const { data: nearbySwimmingPools, isLoading } = useQuery<UseNearbyResponse>({
    queryKey: [center.lat, center.lng, radius],
    queryFn: async () => {
      const params = new URLSearchParams({
        latitude: center.lat.toString(),
        longitude: center.lng.toString(),
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
        return []
      }
    },
    enabled: !!center.lat && !!center.lng,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  })
  console.log(nearbySwimmingPools)
  return { nearbySwimmingPools, isLoading }
}
