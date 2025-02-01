'use client'

import { useState } from 'react'
import IconMenu from '@/components/common/icon-menu'
import { ResponsiveDialog } from '@/components/responsive-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Row } from '@tanstack/react-table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import EditForm from '@/app/(admin)/admin/_components/edit-form'
import { LuEllipsis, LuTrash2, LuNotebookPen } from 'react-icons/lu'
import { useQueryClient } from '@tanstack/react-query'

interface WithId<T> {
  id: number
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData extends WithId<string>>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const poolId = row.original.id
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  // Handle the delete action
  const handleDelete = async (poolId: number) => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://nest-aws.site/api/v1/pools/${poolId}`,
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

      // Close the dialog
      setIsDeleteOpen(false)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '수영장 삭제 실패',
        description: (error as Error).message,
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="수영장 정보 수정하기"
      >
        <EditForm poolId={Number(poolId)} setIsOpen={setIsEditOpen} />
      </ResponsiveDialog>
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>수영장 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive"
              onClick={() => {
                handleDelete(Number(poolId))
              }}
            >
              삭제하기
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full p-0"
          >
            <span className="sr-only">메뉴 열기</span>
            <LuEllipsis className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="z-50 w-[160px]">
          <DropdownMenuItem className="font-base group flex w-full items-center justify-between p-0 text-left text-sm text-neutral-500">
            <button
              onClick={() => {
                setIsEditOpen(true)
              }}
              className="flex w-full justify-start rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
            >
              <IconMenu
                text="수정하기"
                icon={<LuNotebookPen className="h-4 w-4" />}
              />
            </button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="font-base group flex w-full items-center justify-between p-0 text-left text-sm text-neutral-500">
            <button
              onClick={() => {
                setIsDeleteOpen(true)
              }}
              className="flex w-full justify-start rounded-md p-2 text-red-500 transition-all duration-75 hover:bg-neutral-100"
            >
              <IconMenu
                text="삭제하기"
                icon={<LuTrash2 className="h-4 w-4" />}
              />
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
