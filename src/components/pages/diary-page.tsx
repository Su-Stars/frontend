'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { useSwimLogs } from '@/hooks/useSwimLogs'
import { format } from 'date-fns'
import { useUserStore } from '@/providers/user-store-provider'
import Link from 'next/link'

export default function DiaryPage() {
  const [currentDate, setCurrentDate] = useState(format(new Date(), 'yyyy-MM'))
  const { user } = useUserStore((state) => state)

  const { data, isPending, isError, error } = useSwimLogs({
    year: Number(currentDate.split('-')[0]),
    month: Number(currentDate.split('-')[1]),
    user: !!user,
  })
  // if (isPending) return <p>Loading...</p>

  if (isError)
    return <p>Error: {error ? error.message : 'An unknown error occurred'}</p>

  return (
    <div className="flex flex-col space-y-2">
      {/*TODO : 유저정보에 따라 닉네임을 보여주고, 다른 리포트내용은 수영기록 데이터에 따라 렌더링 합니다*/}
      {/* <div className="flex flex-col space-y-2 rounded-md bg-white p-4 shadow-md">
        <h2>
          {currentDate.split('-')[1]}월 {user?.nickname}님의 수영분석
        </h2>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col">
            <span>총 수영거리</span>
            <span>{data?.totalSwimLength}m</span>
          </div>
          <div className="flex flex-col">
            <span>총 수영횟수</span>
            <span>5회</span>
          </div>
          <div className="flex flex-col">
            <span>총 수영시간</span>
            <span>1h 0m</span>
          </div>
        </div>
      </div> */}
      <Calendar
        mode="single"
        // onSelect={(date) => console.log(date)}
        className="mx-auto w-full"
        defaultMonth={new Date()}
        onMonthChange={(month) => {
          setCurrentDate(format(month, 'yyyy-MM'))
        }}
        records={data?.records}
      />

      {user ? (
        <Button className="h-10 w-full" variant="primary" asChild>
          <Link href={`/diary/${format(new Date(), 'yyyy-MM-dd')}`}>
            오늘의 수영 기록 남기기
          </Link>
        </Button>
      ) : (
        <Button className="h-10 w-full" variant="primary" asChild>
          <Link href="/login">오늘의 수영 기록 남기기</Link>
        </Button>
      )}
    </div>
  )
}
