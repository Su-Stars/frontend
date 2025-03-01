'use client'

import { Toggle } from '@/components/ui/toggle'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState, Dispatch, SetStateAction } from 'react'
import { REVIEW_KEYWORDS } from '@/lib/constants'
import MotionTap from '@/components/motion/MotionTap'
import { useToast } from '@/hooks/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { IReview } from '@/app/(menu)/pools/[id]/reviews/_types/reviews'

interface ReviewPostFormProps {
  poolId: number
  setIsOpen: Dispatch<SetStateAction<boolean>>
  review: IReview
}

export default function ReviewEditForm({
  poolId,
  setIsOpen,
  review,
}: ReviewPostFormProps) {
  const [revewKeywords, setReviewKeywords] = useState<string[]>(
    review.keywords || [],
  )
  const [reviewContent, setReviewContent] = useState(review.content)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const handleToggle = (keyword: string) => {
    setReviewKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((item) => item !== keyword)
        : [...prev, keyword],
    )
  }

  const handleSubmit = async () => {
    setLoading(true)
    if (!reviewContent.trim()) {
      setError('리뷰 내용을 입력해주세요')
      return
    }

    if (reviewContent.length < 4) {
      setError('리뷰는 4글자 이상 입력해주세요')
      return
    }

    const reviewForm = {
      keyword: revewKeywords,
      content: reviewContent,
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/pools/${poolId}/reviews/${review.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(reviewForm),
        },
      )

      const json = await response.json()

      if (!response.ok) {
        throw new Error(`[${response.status}] ${json.message}`)
      }

      // 토스트 메세지
      toast({
        title: '리뷰 수정 성공',
        description: '리뷰가 성공적으로 수정되었습니다',
      })

      // 리뷰 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['reviews', poolId] })

      // 리뷰 수정 모달 닫기
      setIsOpen(false)
    } catch (error) {
      console.error('리뷰 작성 실패', error)
      toast({
        title: '리뷰 작성 실패',
        description: '리뷰 작성에 실패했습니다. 잠시 후 다시 시도해주세요',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <form className="mx-auto flex max-w-md flex-col bg-background font-sans">
      {/* Review Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">키워드 리뷰</h2>
        </div>

        {/* Categories */}
        <div className="flex space-x-4 overflow-x-auto whitespace-nowrap">
          {REVIEW_KEYWORDS.map((group) => (
            <div key={group.category} className="flex flex-col">
              <span className="mb-2 font-medium text-blue-400">
                {group.category}
              </span>

              <div className="flex flex-col space-y-2 pb-2">
                {group.keywords.map((keyword) => (
                  <Toggle
                    key={keyword}
                    variant="primary"
                    className="min-w-36"
                    onClick={() => handleToggle(keyword)}
                    defaultPressed={revewKeywords.includes(keyword)}
                  >
                    {keyword}
                  </Toggle>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Review Input */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">리뷰 작성하기</h2>
          <div className="relative">
            <Textarea
              placeholder="자유롭게 리뷰를 작성할 수 있어요"
              className="min-h-[150px] resize-none"
              maxLength={350}
              value={reviewContent}
              onChange={(e) => {
                setReviewContent(e.target.value)
                setError('')
              }}
              required
            />
            <div className="absolute bottom-2 right-2 text-sm text-muted-foreground">
              {reviewContent.length} / 350
            </div>
            {error && (
              <span className="mt-1 text-sm text-red-500">{error}</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <MotionTap className="w-full">
          <Button
            className="w-full"
            size="lg"
            onClick={handleSubmit}
            disabled={loading || reviewContent.length < 4}
            variant="primary"
          >
            수정하기
          </Button>
        </MotionTap>
      </div>
    </form>
  )
}
