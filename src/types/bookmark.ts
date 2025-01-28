import { ApiResponse } from '@/types/api'

interface Bookmark {
  is_bookmarked: boolean
  bookmark_id: number
}

export interface BookmarkResponse extends ApiResponse<Bookmark> {
  data: Bookmark
}
