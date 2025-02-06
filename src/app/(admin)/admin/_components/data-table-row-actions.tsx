'use client'

import { Button } from '@/components/ui/button'
import { Row } from '@tanstack/react-table'
import { useToast } from '@/hooks/use-toast'
import EditForm from '@/app/(admin)/admin/_components/edit-form'
import { LuTrash2, LuNotebookPen } from 'react-icons/lu'
import { useQueryClient } from '@tanstack/react-query'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface WithId<T> {
  id: number
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData extends WithId<string>>({
  row,
}: DataTableRowActionsProps<TData>) {
  const poolId = row.original.id
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Handle the delete action
  const handleDelete = async (poolId: number) => {
    if (!confirm('정말로 삭제하시겠습니까?')) {
      return
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pools/${poolId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      )

      const json = await response.json()

      if (!response.ok) {
        throw new Error(`[${response.status}] ${json.message}`)
      }

      // Invalidate the pools query to refetch the data
      queryClient.invalidateQueries({ queryKey: ['pools'] })

      // Show a success toast
      toast({
        title: '수영장 삭제 완료',
        description: '해당 수영장이 삭제되었습니다.',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '수영장 삭제 실패',
        description: (error as Error).message,
      })
    }
  }
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" aria-label="수정하기">
            <LuNotebookPen aria-hidden />
            <span className="sr-only">수정하기</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>수영장 수정하기</DialogDescription>
            <DialogContent>
              <EditForm poolId={poolId} />
            </DialogContent>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" aria-label="삭제하기">
            <LuTrash2 aria-hidden />
            <span className="sr-only">삭제하기</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>수영장 삭제하기</AlertDialogTitle>
            <AlertDialogDescription>
              이 행동은 되돌릴수 없습니다. 정말 삭제하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                variant="destructive"
                className="bg-red-500 hover:bg-red-600"
                onClick={() => handleDelete(poolId)}
              >
                삭제하기
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
