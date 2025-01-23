'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUserStore } from '@/providers/user-store-provider'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

export default function DesktopHeaderAuth() {
  const pathname = usePathname()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const { user, clearUser } = useUserStore((state) => state)

  const handleLogout = async () => {
    if (!confirm('로그아웃 하시겠습니까?')) return

    setLoading(true)
    try {
      const response = await fetch('https://nest-aws.site/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        const errorMessages: Record<number, string> = {
          401: '인증이 필요합니다.',
          500: '서버 오류가 발생했습니다.',
        }

        const message =
          errorMessages[response.status] || '로그아웃에 실패했습니다.'
        throw new Error(message)
      }

      clearUser()
      toast({
        title: '로그아웃',
        description: '성공적으로 로그아웃되었습니다.',
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: '로그아웃 실패',
        description:
          error instanceof Error
            ? error.message
            : '알 수 없는 오류가 발생했습니다.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">
      {user ? (
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="font-bold text-gray-600 decoration-1 underline-offset-4 hover:text-blue-700 hover:underline"
          disabled={loading}
        >
          로그아웃
        </Button>
      ) : (
        <>
          <Link
            href="/login"
            className={clsx(
              'font-bold text-gray-600 decoration-1 underline-offset-4 hover:text-blue-700 hover:underline',
              { 'text-blue-700': pathname === '/login' },
            )}
          >
            로그인
          </Link>
          <Link
            href="/register"
            className={clsx(
              'font-bold text-gray-600 decoration-1 underline-offset-4 hover:text-blue-700 hover:underline',
              { 'text-blue-700': pathname === '/register' },
            )}
          >
            회원가입
          </Link>
        </>
      )}
    </div>
  )
}
