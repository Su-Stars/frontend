interface User {
  id: number
  nickname: string
  role: 'user' | 'admin'
}

export interface Record {
  id: number
  user_id: number
  swim_date: string
  start_time: string | null
  end_time: string | null
  swim_category: string
  laneLength: number
  swim_length: number
  note: string | null
  created_at: string
  users: User
}

export interface Data {
  totalCount: number
  page: number
  limit: number
  record: Record[]
}

export interface BulletinResponse {
  status: string
  message: string
  data: Data
}
