import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const API_BASE_URL = 'https://sgisapi.kostat.go.kr/OpenAPI3'

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('sgis-auth')?.value || ''

  const cd = new URL(request.url).searchParams.get('cd')

  if (!accessToken || !cd) {
    return NextResponse.json(
      { message: 'accessToken이 필요합니다' },
      { status: 400 },
    )
  }

  const params = new URLSearchParams({
    accessToken,
    cd,
  })

  const url = `${API_BASE_URL}/addr/stage.json?${params.toString()}`

  try {
    const res = await fetch(url)
    const json = await res.json()

    return NextResponse.json(json)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'API 요청 실패' }, { status: 500 })
  }
}
