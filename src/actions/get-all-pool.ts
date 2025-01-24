export const getAllPool = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pools`)
    const json = await response.json()

    // API 응답 구조에 맞춰 처리
    if (json.status === 'error') {
      throw new Error(json.message)
    }

    return json.data
  } catch (error) {
    console.log(error)
    return []
  }
}
