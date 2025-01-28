'use client'

import { useMe } from '@/hooks/use-me'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserStore } from '@/providers/user-store-provider'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { ResponsiveDialog } from '@/components/responsive-dialog'
import { useState } from 'react'
import { LuSettings, LuPencil } from 'react-icons/lu'
import ProfileForm from '@/components/my-page/profile-form'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
import { useRouter } from 'next/navigation'
import { useMyBookmarks } from '@/hooks/use-my-bookmarks'
import PoolBookmarkPreviewItem from '@/components/pool/pool-bookmark-preview-item'
import Link from 'next/link'

export default function MyPage() {
  const { user, clearUser } = useUserStore((state) => state)

  const { data, isLoading, isError } = useMe({ user: !!user })
  const { data: bookmarks } = useMyBookmarks({ user: !!user })
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleDelete = async () => {
    try {
      const response = await fetch('https://nest-aws.site/api/v1/users/me', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const json = await response.json()

      if (!response.ok) {
        throw new Error(`[${response.status}] ${json.message}`)
      }
      clearUser()
      toast({
        title: '회원탈퇴 완료',
        description: '회원탈퇴가 완료되었습니다.',
      })
      router.push('/')
    } catch (error) {
      toast({
        title: '회원탈퇴 실패',
        description: (error as Error).message,
      })
    }
  }
  if (!user) {
    return (
      <div className="flex flex-col p-2">
        <Card>
          <CardContent className="flex flex-col p-6 text-center text-destructive">
            <p>로그인이 필요합니다.</p>
            <Link href="/login" className="text-primary">
              로그인하기
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex flex-col p-2">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="p-6 text-center text-gray-500">
            프로필을 불러오는 중입니다.
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col p-2">
        <Card className="mx-auto max-w-2xl">
          <CardContent className="p-6 text-center text-red-500">
            프로필을 불러오는데 실패했습니다.
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col p-2">
      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <LuSettings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => setIsDeleteOpen(true)}
                >
                  회원탈퇴
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Avatar className="mb-4 h-24 w-24">
            <AvatarImage src={data?.image_url} />
            <AvatarFallback>
              {data?.nickname?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold">{data?.nickname}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-gray-500">이메일</div>
              <div>{data?.email}</div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="text-sm font-semibold text-gray-500">소개</div>
              <div className="text-gray-700">
                {data?.description || '소개가 없습니다.'}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-semibold text-gray-500">가입일</div>
              <div>{format(new Date(data?.create_at), 'yy년 MM월 dd일')}</div>
            </div>
          </div>

          {data?.role === 'admin' && (
            <div className="space-y-2">
              <div className="text-sm font-semibold text-gray-500">역할</div>
              <div>{data?.role}</div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => setIsEditOpen(true)}>
            <LuPencil className="mr-2" />
            프로필 수정
          </Button>
        </CardFooter>
      </Card>

      <section className="mt-4 flex flex-col">
        <h2 className="text-xl font-bold">즐겨찾기</h2>
        <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-4">
          {bookmarks &&
            bookmarks.favorite.map((bookmark, index) => (
              <PoolBookmarkPreviewItem key={index} bookmark={bookmark} />
            ))}
        </div>
      </section>

      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="프로필 수정하기"
        description="내 프로필 수정하기"
      >
        <ProfileForm
          setIsOpen={setIsEditOpen}
          defaultValues={{ description: data?.description || '' }}
        />
      </ResponsiveDialog>
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>회원탈퇴</AlertDialogTitle>
            <AlertDialogDescription>
              정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground"
              onClick={handleDelete}
            >
              탈퇴하기
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
