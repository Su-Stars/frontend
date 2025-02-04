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
  nickname: z.string().min(2, '닉네임은 2자 이상이어야 합니다.'),
})

type ApiError = {
  message: string
  status?: number
}

export default function SignUpPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      nickname: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const response = await fetch(
        'https://nest-aws.site/api/v1/auth/register',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        },
      )
      const data = await response.json()

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error('동일한 이메일이 이미 존재합니다.')
        }
        throw new Error(data.message || '회원가입에 실패했습니다.')
      }

      toast({
        title: '회원가입 성공',
        description: '환영합니다! 이제 로그인할 수 있습니다.',
      })
      navigateToHome()
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : '회원가입에 실패했습니다.'
      toast({
        variant: 'destructive',
        title: '회원가입 실패',
        description: errorMessage,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center">
      <div>
        <Image src="/logo_image.svg" width={83} height={83} alt="logo" />
        <h1 className="text-4xl font-bold">회원가입</h1>
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
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <Input placeholder="" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            회원가입
          </Button>
        </form>
      </Form>
    </div>
  )
}
