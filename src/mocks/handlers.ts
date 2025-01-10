import { http, HttpResponse } from 'msw'

// 핸들러 예시 코드입니다. 실제 코드 작성시에는 userHandler.ts 같이 새 파일을 만들어서 작성하는 것을 권장합니다.
export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('https://example.com/user', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),
]
