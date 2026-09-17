import { MoreHorizontal } from 'lucide-react'
import { Badge } from '../common/Badge'

interface DocumentRow {
  id: string
  title: string
  type: string
  author: string
  createdAt: string
  updatedAt: string
  status: string
}

interface DocumentTableProps {
  rows: DocumentRow[]
}

export function DocumentTable({ rows }: DocumentTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-slate-600">
          <tr>
            <th className="px-4 py-3 font-medium">Document</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Author</th>
            <th className="px-4 py-3 font-medium">Created</th>
            <th className="px-4 py-3 font-medium">Last Updated</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{row.title}</td>
              <td className="px-4 py-3 text-slate-600">{row.type}</td>
              <td className="px-4 py-3 text-slate-600">{row.author}</td>
              <td className="px-4 py-3 text-slate-600">{row.createdAt}</td>
              <td className="px-4 py-3 text-slate-600">{row.updatedAt}</td>
              <td className="px-4 py-3">
                <Badge tone={row.status === 'Indexed' ? 'success' : row.status === 'Processing' ? 'warning' : 'neutral'}>{row.status}</Badge>
              </td>
              <td className="px-4 py-3 text-right">
                <button className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
