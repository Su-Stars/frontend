'use client'

import { usePool } from '@/hooks/use-pool'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useQueryClient } from '@tanstack/react-query'

const formSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  address: z.string().min(1, '주소를 입력해주세요'),
  phone: z.string(),
  website: z.string(),
  laneInfo: z.string(),
  depthInfo: z.string(),
  description: z.string(),
  isSoapProvided: z.boolean().nullable(),
  isTowelProvided: z.boolean().nullable(),
  isKickboardAllowed: z.boolean().nullable(),
  isFinsAllowed: z.boolean().nullable(),
  isKickboardRental: z.boolean().nullable(),
  isDivingAllowed: z.boolean().nullable(),
  isPhotoAllowed: z.boolean().nullable(),
})

interface EditFormProps {
  poolId: number
}

export default function EditForm({ poolId }: EditFormProps) {
  const { data, isPending, isError, error } = usePool({ poolId })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // 다음 주소 검색 API 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script')
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    script.async = true
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  // 주소 검색 모달 열기
  const openAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data: any) {
        form.setValue('address', data.address)
      },
    }).open()
  }

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      website: '',
      laneInfo: '',
      depthInfo: '',
      description: '',
      isSoapProvided: null,
      isTowelProvided: null,
      isKickboardAllowed: null,
      isFinsAllowed: null,
      isKickboardRental: null,
      isDivingAllowed: null,
      isPhotoAllowed: null,
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    // null과 빈 문자열 필터링
    const filteredValues = Object.entries(values).reduce(
      (acc, [key, value]) => {
        if (value !== null && value !== '') {
          acc[key] = value
        }
        return acc
      },
      {} as Record<string, any>,
    )
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pools/${poolId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(filteredValues),
        },
      )

      const json = await response.json()

      if (!response.ok) {
        throw new Error(`[${response.status}] ${json.message}`)
      }

      // 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: ['pool'] })
      await queryClient.invalidateQueries({ queryKey: ['pools'] })

      // 토스트 메시지
      toast({
        title: '수영장 수정 완료',
        description: '해당 수영장이 수정되었습니다.',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '수영장 수정 실패',
        description: (error as Error).message,
      })
    } finally {
      setLoading(false)
    }
  }

  // 3. Reset the form when the data is loaded.
  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        address: data.address,
        phone: data.phone ?? '',
        website: data.website ?? '',
        laneInfo: data.laneInfo ?? '',
        depthInfo: data.depthInfo ?? '',
        description: data.description ?? '',
        isSoapProvided: data.isSoapProvided,
        isTowelProvided: data.isTowelProvided,
        isKickboardAllowed: data.isKickboardAllowed,
        isFinsAllowed: data.isFinsAllowed,
        isKickboardRental: data.isKickboardRental,
        isDivingAllowed: data.isDivingAllowed,
        isPhotoAllowed: data.isPhotoAllowed,
      })
    }
  }, [data, form])

  if (isPending) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error?.message ?? 'Unknown error'}</div>
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>수영장 이름</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>주소</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input {...field} value={field.value ?? ''} />
                </FormControl>
                <Button
                  type="button"
                  variant="outline"
                  onClick={openAddressSearch}
                >
                  주소 검색
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>전화번호</FormLabel>
              <FormControl>
                <Input {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="laneInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>레인 정보</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="depthInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>수심 정보</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value ?? ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>설명</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="isSoapProvided"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>비누 제공</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isTowelProvided"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>수건 제공</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isKickboardAllowed"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>킥보드 사용 가능</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFinsAllowed"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>오리발 사용 가능</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isKickboardRental"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>킥보드 대여</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isDivingAllowed"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>다이빙 가능</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPhotoAllowed"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>사진 촬영 가능</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <Button
          className="w-full"
          variant="primary"
          type="submit"
          disabled={loading}
        >
          수정하기
        </Button>
      </form>
    </Form>
  )
}
