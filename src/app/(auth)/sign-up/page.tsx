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
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'
import { navigateToHome } from '@/actions/redirects'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { registerUser } from '@/actions/auth'

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
      const data = await registerUser(values)

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
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-2">
      <Card className="xl:maw-w-lg flex w-full max-w-md flex-col">
        <CardHeader className="sm:p-8">
          <CardTitle className="text-2xl sm:text-3xl">회원가입</CardTitle>
          <CardDescription className="sm:text-lg">
            이메일과 비밀번호를 입력해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 sm:px-8">
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
        </CardContent>
        <CardFooter>
          <Link href="/login" className="text-primary hover:underline">
            이미 계정이 있으신가요?
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
