import { Badge } from '../common/Badge'

interface ExperimentRow {
  id: string
  name: string
  researchArea: string
  owner: string
  status: string
  startedAt: string
  lastActivity: string
}

interface ExperimentTableProps {
  rows: ExperimentRow[]
}

export function ExperimentTable({ rows }: ExperimentTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-slate-600">
          <tr>
            <th className="px-4 py-3 font-medium">Experiment</th>
            <th className="px-4 py-3 font-medium">Research area</th>
            <th className="px-4 py-3 font-medium">Owner</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Started</th>
            <th className="px-4 py-3 font-medium">Last activity</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{row.name}</td>
              <td className="px-4 py-3 text-slate-600">{row.researchArea}</td>
              <td className="px-4 py-3 text-slate-600">{row.owner}</td>
              <td className="px-4 py-3">
                <Badge tone={row.status === 'Active' ? 'success' : row.status === 'Analysis' ? 'info' : row.status === 'Planning' ? 'warning' : 'neutral'}>{row.status}</Badge>
              </td>
              <td className="px-4 py-3 text-slate-600">{row.startedAt}</td>
              <td className="px-4 py-3 text-slate-600">{row.lastActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
