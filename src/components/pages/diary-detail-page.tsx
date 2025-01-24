'use client'

import { useSwimLogs } from '@/hooks/useSwimLogs'
import { ResponsiveDialog } from '@/components/responsive-dialog'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import SwimLogsForm from '@/components/swim-logs/swim-logs-form'
import SwimLogItem from '@/components/swim-logs/swim-log-item'
import Link from 'next/link'
import { LuArrowLeft } from 'react-icons/lu'

interface DiaryDetailPageProps {
  date: string
}

export default function DiaryDetailPage({ date }: DiaryDetailPageProps) {
  const { data, isPending, isError, error } = useSwimLogs({
    year: Number(date.split('-')[0]),
    month: Number(date.split('-')[1]),
    day: Number(date.split('-')[2]),
  })
  const [isWriteOpen, setIsWriteOpen] = useState(false)

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex w-full items-center gap-4 border-b-slate-200 bg-white">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-md bg-transparent text-black hover:bg-accent"
          asChild
        >
          <Link href="/diary">
            <LuArrowLeft />
          </Link>
        </Button>
        <h2 className="mx-auto text-xl font-semibold">{date}</h2>
      </div>

      {isPending && <p>Loading...</p>}
      {isError && (
        <p>Error: {error ? error.message : 'An unknown error occurred'}</p>
      )}
      {(data?.records[date] &&
        data.records[date].map((log, index) => (
          <SwimLogItem
            date={date}
            key={log.logId}
            log={log}
            index={index}
            onClick={() => {}}
          />
        ))) || <p>기록이 없습니다.</p>}
      <Button variant="primary" onClick={() => setIsWriteOpen(true)}>
        기록 작성
      </Button>
      <ResponsiveDialog
        isOpen={isWriteOpen}
        setIsOpen={setIsWriteOpen}
        title="수영기록 작성"
        description="수영 기록을 작성해주세요"
      >
        <SwimLogsForm date={date} setIsOpen={setIsWriteOpen} />
      </ResponsiveDialog>
    </div>
  )
}
