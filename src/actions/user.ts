export const getMe = async () => {
  try {
    const response = await fetch('https://nest-aws.site/api/v1/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const json = await response.json()

    if (!response.ok) {
      // 서버에서 응답 받은 에러 메시지 사용
      throw new Error(
        `[${response.status}] ${json.message || '내 정보를 불러오는데 실패했습니다.'}`,
      )
    }

    return json.data
  } catch (error) {
    console.error('My info fetch error:', error)
    let errorMessage = '내 정보 데이터 패칭 중 에러가 발생했습니다.'
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        errorMessage =
          '서버와의 통신에 실패했습니다. 서버가 실행 중인지 확인하거나 네트워크 연결을 확인해주세요.'
      } else {
        errorMessage = error.message
      }
    }
    throw new Error(errorMessage)
  }
}
