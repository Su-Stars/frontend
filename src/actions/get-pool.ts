export const getPool = async (poolId: string) => {
  try {
    const response = await fetch(`http://localhost:9999/api/v1/pools/${poolId}`)
    const json = await response.json()

    // API 응답 구조에 맞춰 처리
    if (json.status === 'error') {
      throw new Error(json.message)
    }

    return json.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
