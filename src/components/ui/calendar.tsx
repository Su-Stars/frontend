'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker, DayProps, useDayRender } from 'react-day-picker'
import { ko } from 'date-fns/locale'
import { SwimLog } from '@/types/swim-logs'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import clsx from 'clsx'
import { isToday, isAfter } from 'date-fns'
import Link from 'next/link'

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  records?: {
    [date: string]: SwimLog[]
  }
}

function Calendar({
  records,
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col mx-auto  space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-xl font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-10 w-10 p-0 rounded-full',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex w-full justify-between',
        head_cell: 'text-muted-foreground rounded-md w-12 font-normal text-md',
        row: 'flex w-full mt-2 justify-between',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md',
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-12 w-12 p-0 font-normal aria-selected:opacity-100',
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground ',
        day_outside:
          'day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn('h-20 w-20', className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn('h-20 w-20', className)} {...props} />
        ),
        Day: (dayProps) => <CustomDay {...dayProps} records={records} />,
      }}
      locale={ko}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }

interface CustomDayProps extends DayProps {
  records?: {
    [date: string]: SwimLog[]
  }
}

function CustomDay({ records, ...props }: CustomDayProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null!)
  const dayRender = useDayRender(props.date, props.displayMonth, buttonRef)

  // 날짜를 'YYYY-MM-DD' 형식으로 변환
  const dayString = props.date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'Asia/Seoul',
    })
    .split('. ')
    .join('-')
    .slice(0, -1)
  // 해당 날짜의 수영 기록 찾기
  const logsForDay = records?.[dayString]

  if (dayRender.isHidden) {
    return <div role="gridcell" />
  }
  if (!dayRender.isButton) {
    return <div {...dayRender.divProps} />
  }

  // 일자와 함께 해당 날짜의 수영 기록 수를 표시
  return (
    <button
      {...dayRender.buttonProps}
      className="flex flex-col items-center justify-center gap-1"
    >
      <span
        className={clsx('text-sm font-semibold', {
          'w-full text-gray-500': !isToday(props.date),
          'h-5 w-5 rounded-full bg-gray-500 text-white': isToday(props.date),
        })}
      >
        {props.date.getDate()}
      </span>

      {/* 오늘 이후의 날짜인 경우 */}
      {isAfter(props.date, new Date()) ? (
        <div className="h-10 w-10 cursor-default rounded-lg bg-gray-100 shadow hover:shadow-md"></div>
      ) : logsForDay ? (
        // 수영 기록이 있는 경우
        <Link href={`/diary/${dayString}`}>
          <div className="h-10 w-10 rounded-lg bg-green-300 shadow transition hover:shadow-md"></div>
        </Link>
      ) : (
        // 수영 기록이 없는 경우
        <Link href={`/diary/${dayString}`}>
          <div className="h-10 w-10 rounded-lg bg-gray-300 shadow"></div>
        </Link>
      )}
    </button>
  )
}
