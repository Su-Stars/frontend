'use client'

import { Toggle } from '@/components/ui/toggle'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '../ui/button'
import { useState } from 'react'

const REVIEW_KEYWORDS = [
  {
    category: '청결',
    kewords: ['깨끗한 물', '청결한 샤워실'],
  },
  {
    category: '서비스',
    kewords: ['편리한 센터 이용', '충분한 레인', '적당한 물 온도'],
  },
  {
    category: '가격',
    kewords: ['합리적인 가격'],
  },
  {
    category: '접근성',
    kewords: ['편리한 대중 교통 이용', '넓은 주차 공간', '다양한 주변 맛집'],
  },
  {
    category: '기타',
    kewords: ['눈부신 채광', '오리발 사용 가능', '개인 기구 사용 가능'],
  },
]

interface ReviewFormProps {
  poolId: string
  onSubmit: (poolId: string, reviewId: string) => void
  defaultValues?: {
    keywords: string[]
    content: string
  }
}

export default function ReviewForm({
  poolId,
  onSubmit,
  defaultValues,
}: ReviewFormProps) {
  const [revewKeywords, setReviewKeywords] = useState<string[]>(
    defaultValues?.keywords || [],
  )
  const [reviewContent, setReviewContent] = useState(
    defaultValues?.content || '',
  )

  const handleToggle = (keyword: string) => {
    setReviewKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((item) => item !== keyword)
        : [...prev, keyword],
    )
  }

  const handleSubmit = () => {
    const reviewForm = {
      keywords: revewKeywords,
      content: reviewContent,
    }
    console.log('Submit', reviewForm)
    // createReview(poolId, reviewForm)
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
                {group.kewords.map((keyword) => (
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
              onChange={(e) => setReviewContent(e.target.value)}
            />
            <div className="absolute bottom-2 right-2 text-sm text-muted-foreground">
              {reviewContent.length} / 350
            </div>
          </div>
        </div>

        {/* Submit Button */}
        {/* TODO : 로딩중 상태의 경우 버튼을 비활성화 합니다. */}
        <Button className="w-full" size="lg" onClick={handleSubmit}>
          완료하기
        </Button>
      </div>
    </div>
  )
}
