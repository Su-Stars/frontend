'use client'

interface DiaryDetailPageProps {
  date: string
}

export default function DiaryDetailPage({ date }: DiaryDetailPageProps) {
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="mx-auto text-xl font-semibold">{date}</h2>
      {/*TODO : 해당 주의 달력을 보여줍니다.*/}
      {/* https://codesandbox.io/p/sandbox/react-calendar-week-view-xmt6r?file=%2Fsrc%2FCalendar.js */}
      {/*TODO : 해당 일자의 내 수영 기록을 보여줍니다*/}
      {/*TODO : 해당 일자의 수영일지 추가 버튼을 추가합니다*/}
    </div>
  )
}
