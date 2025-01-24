import { SwimLog } from '@/types/swim-logs'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { useDeleteSwimLog } from '@/hooks/useDeleteSwimLogs'
import { LuTrash2 } from 'react-icons/lu'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'

interface SwimlogItemProps {
  date: string
  log: SwimLog
  index: number
  onClick: () => void
}

export default function SwimLogItem({
  date,
  log,
  index,
  onClick,
}: SwimlogItemProps) {
  const { toast } = useToast()
  const [year, month, day] = date.split('-').map(Number)

  const deleteSwimLog = useDeleteSwimLog({
    year,
    month,
    day,
  })

  const handleDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return

    try {
      await deleteSwimLog.mutateAsync(log.logId)
      toast({
        title: '삭제 성공',
        description: '수영 기록이 삭제되었습니다.',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '삭제 실패',
        description:
          error instanceof Error
            ? error.message
            : '알 수 없는 오류가 발생했습니다.',
      })
    }
  }

  return (
    <div key={log.logId} className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-pretendard text-xl font-semibold">
          {index + 1}번째 수영 기록
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          disabled={deleteSwimLog.isPending}
          className="rounded-full text-red-500 hover:text-red-500"
        >
          <LuTrash2 />
        </Button>
      </div>
      <div className="flex flex-col space-y-2 rounded-md border border-black bg-white p-4">
        <div className="flex flex-col">
          <div className="text-sm text-gray-500">
            {/* 생성일 포맷팅 */}
            {log.created_at && (
              <span>
                {format(parseISO(log.created_at), 'yyyy년 MM월 dd일', {
                  locale: ko,
                })}
              </span>
            )}

            {/* 시작 시간과 종료 시간이 있는 경우에만 표시 */}
            {log.startTime && (
              <span className="ml-2">시작: {log.startTime}</span>
            )}

            {log.endTime && <span className="ml-2">종료: {log.endTime}</span>}

            {log.swimCategory && (
              <span className="ml-2">{log.swimCategory}</span>
            )}
          </div>
          <div className="flex gap-1 text-3xl font-bold">
            <span className="">{log.swimLength}</span>
            <span className="text-green-500">m</span>
          </div>
        </div>
        <div>{log.note}</div>
      </div>
    </div>
  )
}
