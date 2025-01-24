'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Image from 'next/image'
import { useUserStore } from '@/providers/user-store-provider'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'
import { navigateToHome } from '@/actions/redirects'

const formSchema = z.object({
  email: z.string().email('이메일 형식이 아닙니다.'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
})

export default function LoginPage() {
  const { setUser } = useUserStore((state) => state)
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const response = await fetch('https://nest-aws.site/api/v1/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      const data = await response.json()

      if (!response.ok) {
        const errorMessages: Record<number, string> = {
          400: '잘못된 요청입니다.',
          401: '이메일 또는 비밀번호가 일치하지 않습니다.',
          500: '서버 오류가 발생했습니다.',
        }

        const message =
          errorMessages[response.status] || '로그인에 실패했습니다.'
        throw new Error(message)
      }

      // 3. Update the user store with the user data.
      setUser({
        id: data.id,
        email: data.email,
        nickname: data.nickname,
        role: data.role,
      })

      // 4. Show a success toast message and navigate to the home page.
      toast({
        title: '로그인 성공',
        description: '환영합니다!',
      })
      navigateToHome()
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: '로그인 실패',
        description:
          error instanceof Error ? error.message : '로그인에 실패했습니다.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center">
      <div>
        <Image src="/logo_image.svg" width={83} height={83} alt="logo" />
        <h1 className="text-4xl font-bold">로그인</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input placeholder="example@example.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input placeholder="" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link href="/find-password" className="text-blue-500 hover:underline">
            비밀번호를 잊으셨나요?
          </Link>
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            로그인
          </Button>
        </form>
      </Form>
      <Link href="/sign-up" className="text-blue-500 hover:underline">
        계정이 없으신가요?
      </Link>
    </div>
  )
}
