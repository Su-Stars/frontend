export interface SwimLogs {
  date: string
  logId: number
  startTime: string
  endTime: string
  laneLength: number
  totalSwimLength: number
  note: string
}

export interface SwimLogsResponse {
  status: 'success'
  message: string
  data: SwimLogs[]
}
