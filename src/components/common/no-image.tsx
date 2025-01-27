import React from 'react'
import clsx from 'clsx'

interface NoImageProps {
  className?: string
}

export default function NoImage({ className }: NoImageProps) {
  return (
    <div
      className={clsx(
        'flex h-full w-full items-center justify-center bg-gray-300 text-lg font-semibold',
        className,
      )}
    >
      이미지가 없습니다
    </div>
  )
}
