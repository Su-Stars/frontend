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

interface SwimLogsFormProps {
  date: string
}

const formSchema = z
  .object({
    startTime: z.string().optional(),
    endTime: z.string().optional(),
    swimCategory: z.string().optional(),
    laneLength: z.string().optional(),
    totalSwimLength: z
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
      if (!data.startTime || !data.endTime) return true
      return data.startTime < data.endTime
    },
    {
      message: '종료 시간은 시작 시간보다 늦어야 합니다',
      path: ['endTime'],
    },
  )

export default function SwimLogsForm({ date }: SwimLogsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
                name="startTime"
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
                name="endTime"
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
            name="swimCategory"
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
            name="laneLength"
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
            name="totalSwimLength"
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
        {/* TODO : 필수값이 입력되지 않은 경우 버튼을 비활성화합니다
        TODO : 로딩중 버튼을 비활성화합니다. */}
        <Button className="w-full" variant="primary" type="submit">
          추가하기
        </Button>
      </form>
    </Form>
  )
}
