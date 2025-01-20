'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MotionButtonProps {
  children: ReactNode
  className?: string
}

export default function MotionTap({ children, className }: MotionButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      className={cn(className)}
    >
      {children}
    </motion.button>
  )
}
