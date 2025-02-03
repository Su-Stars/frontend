import { Record } from '@/types/bulletin'
import dayjs from '@/lib/dayjs'

interface BulletinItemProps {
  record: Record
}

export default function BulletinItem({ record }: BulletinItemProps) {
  const calculateTime = (startTime: string | null, endTime: string | null) => {
    if (startTime === null || endTime === null) {
      return ' -- : -- '
    }
    const hour = Number(endTime.split(':')[0]) - Number(startTime.split(':')[0])
    const minute =
      Number(endTime.split(':')[1]) - Number(startTime.split(':')[1])

    if (hour === 0) {
      return `${minute} 분`
    } else if (minute === 0) {
      return `${hour} 시간`
    } else {
      return `${hour} 시간 ${minute} 분`
    }
  }

  return (
    <div className="relative flex flex-col gap-3">
      <div>
        <div className="h-40 w-full bg-blue-500" />
      </div>
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-gray-400" />

        <span>{record.users.nickname}</span>
      </div>
      <div>
        <div>
          <p className="absolute right-4 top-[120px] text-lg font-semibold text-white">
            거리: {record.swim_length}m
          </p>

          <p className="absolute left-4 top-[120px] text-lg font-semibold text-white">
            {calculateTime(record.start_time, record.end_time)}
          </p>

          <p>메모: {record.note}</p>
        </div>

        <h3 className="text-sm font-medium text-gray-400">
          {dayjs(record.swim_date).format('YY.MM.DD')}
        </h3>
      </div>
    </div>
  )
}
