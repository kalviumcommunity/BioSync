import type { LucideIcon } from 'lucide-react'
import { BookOpen, FileText, FlaskConical, Network, Sparkles } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string
  trend: string
  detail: string
  icon: string
}

const iconMap: Record<string, LucideIcon> = {
  FileText,
  FlaskConical,
  Network,
  BookOpen,
  Sparkles
}

export function MetricCard({ label, value, trend, detail, icon }: MetricCardProps) {
  const Icon = iconMap[icon]

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft hover:border-slate-300 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="font-medium text-emerald-600">{trend}</span>
        <span className="text-slate-500">{detail}</span>
      </div>
    </div>
  )
}
