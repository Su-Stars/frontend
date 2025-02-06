export interface LoginValues {
  email: string
  password: string
}

export const loginUser = async (values: LoginValues) => {
  try {
    const response = await fetch('https://nest-aws.site/api/v1/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    const json = await response.json()

    if (!response.ok) {
      // 서버로부터 전달받은 에러 메시지 사용
      throw new Error(
        `[${response.status}] ${json.message || '로그인에 실패했습니다.'}`,
      )
    }

    return json.data
  } catch (error) {
    console.error('Login fetch error:', error)
    let errorMessage = '로그인 중 에러가 발생했습니다.'
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

export interface RegisterValues {
  email: string
  password: string
  nickname: string
  // 추가 필드가 필요하면 여기에 추가
}

export const registerUser = async (values: RegisterValues) => {
  try {
    const response = await fetch('https://nest-aws.site/api/v1/auth/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })

    const json = await response.json()

    if (!response.ok) {
      throw new Error(
        `[${response.status}] ${json.message || '회원가입에 실패했습니다.'}`,
      )
    }

    return json.data
  } catch (error) {
    console.error('Register fetch error:', error)
    let errorMessage = '회원가입 중 에러가 발생했습니다.'
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
