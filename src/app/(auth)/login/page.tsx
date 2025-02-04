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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

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
      const json = await response.json()

      if (!response.ok) {
        throw new Error(`[${response.status}] ${json.message}`)
      }

      const data = json.data

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
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-2">
      <Card className="xl:maw-w-lg flex w-full max-w-md flex-col">
        <CardHeader className="sm:p-8">
          <CardTitle className="text-2xl sm:text-3xl">로그인</CardTitle>
          <CardDescription className="sm:text-lg">
            계정에 로그인하세요.
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
        </CardContent>
        <CardFooter>
          <Link href="/sign-up" className="text-primary hover:underline">
            계정이 없으신가요?
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
