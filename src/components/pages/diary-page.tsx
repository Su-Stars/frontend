'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { useSwimLogs } from '@/hooks/userSwimLogs'
import { format } from 'date-fns'

//TODO : HOC로 감싸서 로그인하지 않은 유저를 걸러냅니다.
export default function DiaryPage() {
  const [currentDate, setCurrentDate] = useState(format(new Date(), 'yyyy-MM'))

  const { data, isPending, isError, error } = useSwimLogs({
    year: Number(currentDate.split('-')[0]),
    month: Number(currentDate.split('-')[1]),
  })

  /*TODO : 유저정보를 윺저스토어에서 가져옵니다*/

  // if (isPending) return <p>Loading...</p>

  if (isError)
    return <p>Error: {error ? error.message : 'An unknown error occurred'}</p>

  console.log(data)

  return (
    <div className="flex flex-col space-y-2">
      {/*TODO : Add a button to navigate to today*/}
      <Button>오늘</Button>
      {/*TODO : 유저정보에 따라 닉네임을 보여주고, 다른 리포트내용은 수영기록 데이터에 따라 렌더링 합니다*/}
      <div className="flex flex-col space-y-2 rounded-md bg-white p-4 shadow-md">
        <h2>{currentDate.split('-')[1]}월 평형좌님의 수영분석</h2>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col">
            <span>총 수영거리</span>
            <span>{data?.totalLength}</span>
          </div>
          <div className="flex flex-col">
            <span>총 수영횟수</span>
            <span>{data?.records.length}</span>
          </div>
          <div className="flex flex-col">
            <span>총 수영시간</span>
            <span>1h 0m</span>
          </div>
        </div>
      </div>
      <Calendar
        mode="single"
        onSelect={(date) => console.log(date)}
        className="mx-auto w-full"
        defaultMonth={new Date()}
        onMonthChange={(month) => {
          setCurrentDate(format(month, 'yyyy-MM'))
        }}
        swimLogs={data?.records}
      />
      <Button>수영 기록 추가</Button>
    </div>
  )
}
