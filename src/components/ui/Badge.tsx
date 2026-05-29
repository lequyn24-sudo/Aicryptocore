import type { ReactNode } from 'react'

type BadgeVariant = 'category' | 'sponsored' | 'new' | 'breaking' | 'premium'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  category: 'badge-teal',
  sponsored: 'badge-amber',
  new: 'badge-teal',
  breaking: 'badge-red',
  premium: 'badge-violet',
}

export function Badge({ variant = 'category', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
