import { IUserRecord } from '@/hooks/use-bulletin'
import Image from 'next/image'

interface BulletinItemProps {
  item: IUserRecord
}

export default function BulletinItem({ item }: BulletinItemProps) {
  const calculateTime = (startTime: string, endTime: string) => {
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
        {item.image_url ? (
          <Image
            src={item.image_url}
            width={100}
            height={100}
            className="h-40 w-full"
            alt="물"
          />
        ) : (
          <div className="h-40 w-full bg-blue-500" />
        )}
      </div>
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-gray-400" />

        <span>{item.nickname}</span>
      </div>
      <div>
        {Object.entries(item.record).map(([date, records], index) => (
          <div key={`${date}-${index}`}>
            {records.map((record) => (
              <div key={record.logId}>
                <p className="absolute right-4 top-[120px] text-lg font-semibold text-white">
                  거리: {record.swimLength}m
                </p>

                <p className="absolute left-4 top-[120px] text-lg font-semibold text-white">
                  {calculateTime(record.startTime, record.endTime)}
                </p>

                <p>메모: {record.note}</p>
              </div>
            ))}
            <h3 className="text-sm text-gray-400">{date}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
