import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  tone?: 'success' | 'warning' | 'neutral' | 'info' | 'danger'
  className?: string
}

export function Badge({ children, tone = 'neutral', className = '' }: BadgeProps) {
  const tones = {
    success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    warning: 'bg-amber-50 text-amber-700 ring-amber-200',
    neutral: 'bg-slate-100 text-slate-700 ring-slate-200',
    info: 'bg-cyan-50 text-cyan-700 ring-cyan-200',
    danger: 'bg-rose-50 text-rose-700 ring-rose-200'
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${tones[tone]} ${className}`}>
      {children}
    </span>
  )
}
