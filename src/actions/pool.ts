import { ApiResponse } from '@/types/api'
import type { Pool } from '@/types/pool'

export const getPool = async (poolId: number): Promise<Pool> => {
  try {
    const response = await fetch(
      `https://nest-aws.site/api/v1/pools/${poolId}`,
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

    const json: ApiResponse<Pool> = await response.json()

    if (!json.data) {
      throw new Error('수영장 데이터가 존재하지 않습니다.')
    }

    return json.data as Pool
  } catch (error) {
    console.error('Pool fetch error:', error)
    throw error
  }
}
