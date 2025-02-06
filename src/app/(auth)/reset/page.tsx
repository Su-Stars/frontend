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
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const requestSchema = z.object({
  email: z.string().email('이메일 형식이 아닙니다.'),
})

const resetSchema = z
  .object({
    password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
    confirmPassword: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })

// 에러 타입 정의
type ApiError = {
  message: string
  status?: number
}

export default function ResetPasswordPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [step, setStep] = useState<'request' | 'reset'>('request')
  const [email, setEmail] = useState('')

  const requestForm = useForm<z.infer<typeof requestSchema>>({
    resolver: zodResolver(requestSchema),
    defaultValues: { email: '' },
  })

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: { password: '', confirmPassword: '' },
  })

  async function handleRequest(values: z.infer<typeof requestSchema>) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/request-reset`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        },
      )

      if (!response.ok) throw new Error('이메일 전송에 실패했습니다.')

      toast({
        title: '이메일 전송 완료',
        description: '비밀번호 재설정 링크를 확인하세요.',
      })
      setEmail(values.email)
      setStep('reset')
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.'
      toast({
        variant: 'destructive',
        title: '오류 발생',
        description: errorMessage,
      })
    }
  }

  async function handleReset(values: z.infer<typeof resetSchema>) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/reset-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, ...values }),
        },
      )

      if (!response.ok) throw new Error('비밀번호 재설정에 실패했습니다.')

      toast({
        title: '비밀번호 변경 완료',
        description: '새 비밀번호로 로그인하세요.',
      })
      router.push('/login')
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.'
      toast({
        variant: 'destructive',
        title: '오류 발생',
        description: errorMessage,
      })
    }
  }

  return (
    <div className="flex flex-col justify-center">
      <div>
        <Image src="/logo_image.svg" width={83} height={83} alt="logo" />
        <h1 className="text-4xl font-bold">비밀번호 재설정</h1>
      </div>
      {step === 'request' ? (
        <Form {...requestForm}>
          <form
            onSubmit={requestForm.handleSubmit(handleRequest)}
            className="space-y-8"
          >
            <FormField
              control={requestForm.control}
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
            <Button type="submit" variant="primary" className="w-full">
              비밀번호 재설정 이메일 보내기
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...resetForm}>
          <form
            onSubmit={resetForm.handleSubmit(handleReset)}
            className="space-y-8"
          >
            <FormField
              control={resetForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>새 비밀번호</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={resetForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="primary" className="w-full">
              비밀번호 변경하기
            </Button>
          </form>
        </Form>
      )}
      <Link href="/login" className="text-blue-500 hover:underline">
        로그인으로 돌아가기
      </Link>
    </div>
  )
}
