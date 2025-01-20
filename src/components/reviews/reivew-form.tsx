'use client'

import { Toggle } from '@/components/ui/toggle'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState, Dispatch, SetStateAction } from 'react'
import { REVIEW_KEYWORDS } from '@/lib/constants'

interface ReviewFormProps {
  poolId: string
  onSubmit:
    | ((poolId: string, reviewId: string) => void)
    | ((poolId: string, reviewId: string, reviewForm: any) => void)
  defaultValues?: {
    keywords: string[]
    content: string
  }
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function ReviewForm({
  poolId,
  onSubmit,
  defaultValues,
  setIsOpen,
}: ReviewFormProps) {
  const [revewKeywords, setReviewKeywords] = useState<string[]>(
    defaultValues?.keywords || [],
  )
  const [reviewContent, setReviewContent] = useState(
    defaultValues?.content || '',
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleToggle = (keyword: string) => {
    setReviewKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((item) => item !== keyword)
        : [...prev, keyword],
    )
  }

  const handleSubmit = () => {
    if (!reviewContent.trim()) {
      setError('리뷰 내용을 입력해주세요')
      return
    }

    if (reviewContent.length < 4) {
      setError('리뷰는 4글자 이상 입력해주세요')
      return
    }

    const reviewForm = {
      keywords: revewKeywords,
      content: reviewContent,
    }

    setIsOpen(false)

    try {
      setLoading(true)
      setTimeout(() => {
        console.log(poolId, reviewForm)
      }, 1000)

      // onSubmit(poolId, reviewForm)
    } catch (error) {
      setError('리뷰 작성에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="mx-auto flex max-w-md flex-col bg-background font-sans">
      {/* Review Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">키워드 리뷰</h2>
        </div>

        {/* Categories */}
        <div className="flex space-x-4 overflow-x-scroll">
          {REVIEW_KEYWORDS.map((group) => (
            <div key={group.category} className="flex flex-col">
              <span className="mb-2 font-medium text-blue-400">
                {group.category}
              </span>

              <div className="flex flex-col space-y-2 pb-2">
                {group.keywords.map((keyword) => (
                  <Toggle
                    key={keyword}
                    variant="outline"
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
        <Button
          className="w-full"
          size="lg"
          onClick={handleSubmit}
          disabled={loading || reviewContent.length < 4}
        >
          완료하기
        </Button>
      </div>
    </div>
  )
}
