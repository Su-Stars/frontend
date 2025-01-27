export const getPool = async (poolId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/pools/${poolId}`,
    )
    if (!response.ok) {
      const errorMessages: Record<number, string> = {
        400: '잘못된 요청입니다.',
        404: '수영장을 찾을 수 없습니다.',
        500: '서버 오류가 발생했습니다.',
      }

      const message =
        errorMessages[response.status] || '수영장을 찾을 수 없습니다.'

      throw new Error(message)
    }
    const json = await response.json()

    return json.data[0]
  } catch (error) {
    throw error
  }
}
