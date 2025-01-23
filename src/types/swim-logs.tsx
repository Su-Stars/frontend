export interface SwimLog {
  logId: number
  startTime: string | null
  endTime: string | null
  laneLength: number | null
  swimCategory: string
  swimLength: number
  note: string | null
  created_at: string
}

export interface SwimLogsData {
  year: string
  month: string
  day?: string
  totalSwimLength: number
  records: {
    [date: string]: SwimLog[]
  }
}

export interface SwimLogsResponse {
  status: 'success'
  message: string
  data: SwimLogsData
}
