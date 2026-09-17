import type { ReactNode } from 'react'

interface PageContainerProps {
  title: string
  subtitle?: string
  actions?: ReactNode
  children: ReactNode
}

export function PageContainer({ title, subtitle, actions, children }: PageContainerProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
        </div>
        {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
      </div>
      {children}
    </div>
  )
}
