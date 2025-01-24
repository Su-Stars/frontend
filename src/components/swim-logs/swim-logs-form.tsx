'use client'

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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { SwimLogPayload, useAddSwimLog } from '@/hooks/useAddSwimLogs'

interface SwimLogsFormProps {
  date: string
  setIsOpen: (isOpen: boolean) => void
}

const formSchema = z
  .object({
    start_time: z.string().optional(),
    end_time: z.string().optional(),
    swim_category: z.string().optional(),
    lane_length: z.string().regex(/^\d+$/, '숫자만 입력해주세요').optional(),
    swim_length: z
      .string({
        message: '총 수영 거리를 입력해주세요',
      })
      .regex(/^\d+$/, '숫자만 입력해주세요'),
    note: z
      .string()
      .max(200, '메모는 최대 200자까지 입력 가능합니다')
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.start_time || !data.end_time) return true
      return data.start_time < data.end_time
    },
    {
      message: '종료 시간은 시작 시간보다 늦어야 합니다',
      path: ['endTime'],
    },
  )

export default function SwimLogsForm({ date, setIsOpen }: SwimLogsFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [year, month, day] = date.split('-').map(Number)

  const addSwimLog = useAddSwimLog({
    year,
    month,
    day,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      swim_length: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const numberFields = ['lane_length', 'swim_length']

    const formPayload = Object.entries(values).reduce(
      (acc, [key, value]) => {
        if (value !== undefined) {
          // 숫자로 변환이 필요한 필드인 경우
          if (numberFields.includes(key)) {
            acc[key] = Number(value)
          } else {
            acc[key] = value
          }
        }
        return acc
      },
      {} as Record<string, any>,
    )

    // date 추가
    formPayload.swim_date = date

    setLoading(true)
    try {
      await addSwimLog.mutateAsync(formPayload as SwimLogPayload)

      setIsOpen(false)
      toast({
        title: '수영 기록 추가 성공',
        description: '수영 기록이 추가되었습니다.',
      })
    } catch (error: any) {
      toast({
        title: '수영 기록 추가 실패',
        description: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <FormLabel>수영 시간</FormLabel>
            <div className="flex items-center gap-1">
              <FormField
                control={form.control}
                name="start_time"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="shadcn" type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">~</div>
              <FormField
                control={form.control}
                name="end_time"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="shadcn" type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <FormLabel>영법</FormLabel>
          <FormField
            control={form.control}
            name="swim_category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="영법을 선택해주세요." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="자유형">자유형</SelectItem>
                      <SelectItem value="접영">접영</SelectItem>
                      <SelectItem value="평영">평영</SelectItem>
                      <SelectItem value="배영">배영</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between">
          <FormLabel>레인 길이</FormLabel>
          <FormField
            control={form.control}
            name="lane_length"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="25m" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between">
          <FormLabel>총 거리*</FormLabel>
          <FormField
            control={form.control}
            name="swim_length"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="1000m" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormLabel>메모</FormLabel>
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* TODO : 로딩중 버튼을 비활성화합니다. */}
        <Button
          className="w-full"
          variant="primary"
          type="submit"
          disabled={loading}
        >
          추가하기
        </Button>
      </form>
    </Form>
  )
}
