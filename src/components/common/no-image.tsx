import React from 'react'
import clsx from 'clsx'

interface NoImageProps {
  className?: string
}

export default function NoImage({ className }: NoImageProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center rounded-lg border bg-gray-300 text-center text-lg font-semibold',
        className,
      )}
    >
      이미지가 없습니다
    </div>
  )
}
