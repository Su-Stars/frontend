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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Textarea } from '@/components/ui/textarea'

interface ProfileFormProps {
  setIsOpen: (isOpen: boolean) => void
  defaultValues: {
    description: string
  }
}

const formSchema = z.object({
  description: z.string().optional(),
})

export default function ProfileForm({
  setIsOpen,
  defaultValues,
}: ProfileFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: defaultValues.description,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)

    try {
      const response = await fetch('https://nest-aws.site/api/v1/users/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(values),
      })

      const json = await response.json()

      if (!response.ok) {
        throw new Error(`[${response.status}] ${json.message}`)
      }

      toast({
        title: '성공',

        description: '프로필이 수정되었습니다.',
      })
    } catch (error) {
      toast({
        title: '실패',
        description: '프로필 수정에 실패했습니다.',
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
        <div>
          <FormLabel>소개</FormLabel>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="h-[70px]">
                <FormControl>
                  <Textarea {...field} className="resize-none" />
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
          수정하기
        </Button>
      </form>
    </Form>
  )
}
