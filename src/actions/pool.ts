import { ApiResponse } from '@/types/api'
import type { PoolDetail } from '@/types/pools'

export const getPool = async (poolId: number): Promise<PoolDetail> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/pools/${poolId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (!response.ok) {
      const json = await response.json()
      throw new Error(
        `[${response.status}] ${json.message || '수영장을 찾을 수 없습니다.'}`,
      )
    }

    const json: ApiResponse<PoolDetail> = await response.json()

    if (!json.data) {
      throw new Error('수영장 데이터가 존재하지 않습니다.')
    }

    return json.data
  } catch (error) {
    console.error('Pool fetch error:', error)
    throw error
  }
}
