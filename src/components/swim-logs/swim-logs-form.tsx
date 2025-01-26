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
import { Textarea } from '@/components/ui/textarea'

interface SwimLogsFormProps {
  date: string
  setIsOpen: (isOpen: boolean) => void
}

const formSchema = z
  .object({
    start_time: z.string().optional(),
    end_time: z.string().optional(),
    swim_category: z.string().optional(),
    lane_length: z.string().regex(/^\d+$/, '레인 길이를 입력해주세요'),
    swim_length: z
      .string({
        message: '수영 거리를 입력해주세요',
      })
      .regex(/^\d+$/, '수영거리를 입력해주세요')
      .min(1, '수영 거리를 입력해주세요'),
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
      message: '종료 시간은 시작 시간 이후여야 합니다.',
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
      start_time: '',
      end_time: '',
      swim_category: '',
      lane_length: '',
      swim_length: '',
      note: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const numberFields = ['lane_length', 'swim_length']

    const formPayload = Object.entries(values).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== '') {
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
      console.error(error)
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col p-4 md:p-0"
      >
        <div className="flex flex-col">
          <div className="flex justify-between">
            <FormLabel>수영 시간</FormLabel>
            <div className="flex items-center gap-1">
              <FormField
                control={form.control}
                name="start_time"
                render={({ field }) => (
                  <FormItem className="h-[70px]">
                    <FormControl>
                      <Input placeholder="shadcn" type="time" {...field} />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
              <div className="text-center">~</div>
              <FormField
                control={form.control}
                name="end_time"
                render={({ field }) => (
                  <FormItem className="h-[70px]">
                    <FormControl>
                      <Input placeholder="shadcn" type="time" {...field} />
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <FormLabel>영법</FormLabel>
          <FormField
            control={form.control}
            name="swim_category"
            render={({ field }) => (
              <FormItem className="h-[70px]">
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
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between">
          <FormLabel>
            레인 길이<span className="ml-1 text-blue-500">*</span>
          </FormLabel>
          <FormField
            control={form.control}
            name="lane_length"
            render={({ field }) => (
              <FormItem className="h-[70px]">
                <FormControl>
                  <Input {...field} placeholder="25m" />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between">
          <FormLabel>
            수영 거리<span className="ml-1 text-blue-500">*</span>
          </FormLabel>
          <FormField
            control={form.control}
            name="swim_length"
            render={({ field }) => (
              <FormItem className="h-[70px]">
                <FormControl>
                  <Input {...field} placeholder="1000m" />
                </FormControl>
                <FormMessage className="text-sm" />
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
              <FormItem className="h-[70px]">
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="수영기록을 남겨주세요"
                    className="resize-none"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
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
          추가하기
        </Button>
      </form>
    </Form>
  )
}
