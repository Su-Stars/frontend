'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUserStore } from '@/providers/user-store-provider'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { navigateToHome } from '@/actions/redirects'

export default function DesktopHeaderAuth() {
  const pathname = usePathname()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const { user, clearUser } = useUserStore((state) => state)
  const queryClient = useQueryClient()

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

      const data = await response.json()

      if (!response.ok) {
        const status = response.status

        if (status === 401) {
          // 유저 상태 초기화
          clearUser()

          // 캐시 초기화
          queryClient.clear()

          //홈으로 이동
          navigateToHome()

          // 토스트 메시지
          toast({
            title: '로그아웃',
            description: '성공적으로 로그아웃되었습니다.',
          })
          return
        }
        const message = data.message || '로그아웃에 실패했습니다.'
        throw new Error(`[${status} 에러] ${message}`)
      }

      // 유저 상태 초기화
      clearUser()

      // 캐시 초기화
      queryClient.clear()

      //홈으로 이동
      navigateToHome()

      // 토스트 메시지
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
