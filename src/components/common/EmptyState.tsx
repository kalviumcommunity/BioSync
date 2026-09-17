import { FolderOpen } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <FolderOpen className="mb-4 h-9 w-9 text-slate-400" />
      <div className="text-lg font-semibold text-slate-800">{title}</div>
      {description ? <p className="mt-2 max-w-md text-sm text-slate-500">{description}</p> : null}
    </div>
  )
}
