// Todo : 쿠키 값 추가해서 api 요청해야 함

// 개별 수영장 북마크 여부
export const getBookmark = async (poolId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/pools/${poolId}/bookmarked`,
    )
    const json = await response.json()

    // API 응답 구조에 맞춰 처리
    if (json.status !== 'success') {
      throw new Error(json.message)
    }
    console.log(json)

    return json.data
  } catch (error) {
    console.log(error)
    return false
  }
}

export const addBookmark = async (poolId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmarks`,
      {
        method: 'POST',
        body: JSON.stringify(poolId),
      },
    )
    const json = await response.json()

    // API 응답 구조에 맞춰 처리
    if (json.status !== 'success') {
      throw new Error(json.message)
    }

    console.log(json)
    return json
  } catch (error) {
    console.log(error)
    return []
  }
}

export const deleteBookmark = async (poolId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmarks/${poolId}`,
      {
        method: 'DELETE',
      },
    )
    const json = await response.json()

    // API 응답 구조에 맞춰 처리
    if (json.status !== 'success') {
      throw new Error(json.message)
    }

    console.log(json)
    return json
  } catch (error) {
    console.log(error)
    return []
  }
}
