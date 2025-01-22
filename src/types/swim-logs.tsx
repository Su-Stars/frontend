export interface SwimLog {
  logId: number
  startTime: string
  endTime: string
  laneLength: number
  totalSwimLength: number
  note: string
}

export interface SwimRecord {
  date: string
  logs: SwimLog[]
}

export interface SwimLogsData {
  year: number
  month: number
  totalDays: number
  totalLength: number
  records: SwimRecord[]
}

export interface SwimLogsResponse {
  status: 'success'
  message: string
  data: SwimLogsData
}
