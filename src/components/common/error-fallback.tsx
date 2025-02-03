'use client'

import React from 'react'

interface ErrorFallbackProps {
  error: Error | null
  resetErrorBoundary?: () => void
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded bg-red-50 p-4 text-red-700">
      <p className="text-lg font-semibold">오류가 발생했습니다.</p>
      <pre className="mt-2 text-sm">
        {error?.message || '알 수 없는 오류가 발생했습니다.'}
      </pre>
      {resetErrorBoundary && (
        <button
          onClick={resetErrorBoundary}
          className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
          다시 시도하기
        </button>
      )}
    </div>
  )
}
