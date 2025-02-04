import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useQueryClient } from '@tanstack/react-query'

export default function UserImageForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const queryClient = useQueryClient()

  // 파일 선택 이벤트 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedImage) {
      toast({
        title: '이미지를 선택하세요.',
        variant: 'destructive',
      })
      return
    }

    // FormData 객체에 "user-image" 필드명으로 파일 첨부
    const formData = new FormData()
    formData.append('user-image', selectedImage)

    try {
      const response = await fetch(`https://nest-aws.site/api/v1/users/image`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })

      const json = await response.json()

      if (!response.ok) {
        throw new Error(`[${response.status}] ${json.message}`)
      }

      toast({
        title: '이미지가 업로드되었습니다.',
        description: '프로필 이미지가 변경되었습니다.',
      })

      // Invalidate the user query to refetch the data
      queryClient.invalidateQueries({ queryKey: ['me'] })
    } catch (error) {
      toast({
        title: '오류가 발생했습니다.',
        description: error instanceof Error ? error.message : '알 수 없는 오류',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="file"
        name="pool"
        accept="image/*"
        disabled={loading}
        onChange={handleFileChange}
      />

      <Button type="submit" disabled={loading}>
        이미지 업로드
      </Button>
    </form>
  )
}
