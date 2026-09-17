import { Badge } from '../common/Badge'

interface ExperimentCardProps {
  name: string
  area: string
  owner: string
  status: string
  startedAt: string
  lastActivity: string
}

export function ExperimentCard({ name, area, owner, status, startedAt, lastActivity }: ExperimentCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft transition hover:border-slate-300">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-semibold text-slate-900">{name}</div>
          <div className="mt-1 text-sm text-slate-500">{area}</div>
        </div>
        <Badge tone={status === 'Active' ? 'success' : status === 'Analysis' ? 'info' : status === 'Planning' ? 'warning' : 'neutral'}>{status}</Badge>
      </div>
      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <div>Owner: {owner}</div>
        <div>Started: {startedAt}</div>
        <div>Last activity: {lastActivity}</div>
      </div>
    </div>
  )
}
