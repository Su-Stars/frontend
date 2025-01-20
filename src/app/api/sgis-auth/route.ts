import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://sgisapi.kostat.go.kr/OpenAPI3'

// accesstoken 만료가 4시간이므로 4시간 마다 토큰 갱신
export const config = {
  revalidate: 60 * 60 * 4, // 60초마다 재검증
}

export async function GET() {
  const cookieStore = await cookies()

  try {
    const serviceId = process.env.NEXT_PUBLIC_SGIS_SERVICE_ID
    const securityKey = process.env.NEXT_PUBLIC_SGIS_SECURITY_KEY

    const params = new URLSearchParams({
      consumer_key: serviceId || '',
      consumer_secret: securityKey || '',
    })

    const url = `${API_BASE_URL}/auth/authentication.json?${params.toString()}`

    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(`Authentication failed: ${res.status}`)
    }

    const json = await res.json()
    cookieStore.set('sgis-auth', json.result.accessToken)

    return NextResponse.json(json)
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
