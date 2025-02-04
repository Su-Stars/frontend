import { Record } from '@/types/bulletin'
import dayjs from '@/lib/dayjs'
import Image from 'next/image'
import { Clock, MapPin } from 'lucide-react'

interface BulletinItemProps {
  record: Record
}

export default function BulletinItem({ record }: BulletinItemProps) {
  console.log(record)
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

  const timeFormat = (time: string) => {
    const now = dayjs()
    const created = dayjs(time).add(18, 'hour')
    const diffMinutes = now.diff(created, 'minute') // 현재 시간을 분으로 치환

    console.log('현재', now)
    console.log('노트 생성', created)
    console.log('차이', diffMinutes)

    if (diffMinutes < 1) return '방금 전'
    if (diffMinutes < 60) return `${diffMinutes}분 전`

    const diffHours = now.diff(created, 'hour')
    if (diffHours < 24) return `${diffHours}시간 전`

    const diffDays = now.diff(created, 'day')
    if (diffDays < 7) return `${diffDays}일 전`

    return dayjs(record.created_at).format('YY.MM.DD')
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md">
      <div className="relative">
        <div className="h-40 w-full bg-blue-500" />
        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4 text-white">
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-white" />
            <span className="text-lg font-semibold">
              {calculateTime(record.start_time, record.end_time)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-white" />
            <span className="text-lg font-semibold">
              거리: {record.swim_length}m
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-center space-x-3">
          <Image
            src={`https://picsum.photos/id/${record.user_id}/50/50`}
            className="rounded-full shadow-md"
            width={50}
            height={50}
            alt="profile"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              {record.users.nickname}
            </h3>
            <time className="text-sm text-gray-500">
              {timeFormat(record.created_at)}
            </time>
          </div>
        </div>

        <div className="space-y-2">
          <p className="leading-relaxed text-gray-700">
            {record.note ? (
              record.note
            ) : (
              <span className="italic text-gray-400">메모를 입력하세요</span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
