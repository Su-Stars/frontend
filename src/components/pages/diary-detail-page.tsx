'use client'

import { useSwimLogs } from '@/hooks/useSwimLogs'
import { ResponsiveDialog } from '@/components/responsive-dialog'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import SwimLogsForm from '@/components/swim-logs/swim-logs-form'

interface DiaryDetailPageProps {
  date: string
}

export default function DiaryDetailPage({ date }: DiaryDetailPageProps) {
  const { data, isPending, isError, error } = useSwimLogs({
    year: Number(date.split('-')[0]),
    month: Number(date.split('-')[1]),
    date: date.split('-')[2],
  })
  const [isWriteOpen, setIsWriteOpen] = useState(false)

  return (
    <div className="flex flex-col space-y-2">
      <h2 className="mx-auto text-xl font-semibold">{date}</h2>
      {isPending && <p>Loading...</p>}
      {isError && (
        <p>Error: {error ? error.message : 'An unknown error occurred'}</p>
      )}
      {data &&
        data.records[date].map((log, index) => (
          <div key={log.logId} className="flex flex-col space-y-2">
            <h3 className="font-pretendard text-xl font-semibold">
              {index + 1}번째 수영 기록
            </h3>
            <div className="flex flex-col space-y-2 rounded-md border border-black bg-white p-4">
              <div className="flex flex-col">
                <div className="font-semibold text-gray-500">
                  {log.created_at} {log.startTime} {log.endTime}{' '}
                  {log.swimCategory}
                </div>
                <div className="flex gap-1 text-3xl font-bold">
                  <span className="">{log.swimLength}</span>
                  <span className="text-green-500">m</span>
                </div>
              </div>
              <div>{log.note}</div>
            </div>
          </div>
        ))}
      <Button onClick={() => setIsWriteOpen(true)}>기록 작성</Button>
      <ResponsiveDialog
        isOpen={isWriteOpen}
        setIsOpen={setIsWriteOpen}
        title="수영기록 작성"
        description="수영 기록을 작성해주세요"
      >
        <SwimLogsForm date={date} />
      </ResponsiveDialog>
    </div>
  )
}
