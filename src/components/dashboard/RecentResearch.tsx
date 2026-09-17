import { Badge } from '../common/Badge'

interface RecentItem {
  id: string
  title: string
  type: string
  researcher: string
  updated: string
  status: string
}

interface RecentResearchProps {
  items: RecentItem[]
}

const statusTone: Record<string, 'success' | 'warning' | 'neutral' | 'info'> = {
  Active: 'success',
  Reviewed: 'info',
  Indexed: 'success',
  Processing: 'warning'
}

export function RecentResearch({ items }: RecentResearchProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
      <h3 className="text-lg font-semibold text-slate-900">Recent Research</h3>
      <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Researcher</th>
              <th className="px-4 py-3 font-medium">Updated</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {items.map((item) => (
              <tr key={item.id} className="cursor-pointer hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{item.title}</td>
                <td className="px-4 py-3 text-slate-600">{item.type}</td>
                <td className="px-4 py-3 text-slate-600">{item.researcher}</td>
                <td className="px-4 py-3 text-slate-600">{item.updated}</td>
                <td className="px-4 py-3">
                  <Badge tone={statusTone[item.status] ?? 'neutral'}>{item.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
