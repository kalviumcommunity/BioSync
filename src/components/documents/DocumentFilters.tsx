import { SlidersHorizontal } from 'lucide-react'
import { SearchInput } from '../common/SearchInput'
import { Button } from '../common/Button'

interface DocumentFiltersProps {
  search: string
  onSearch: (value: string) => void
}

export function DocumentFilters({ search, onSearch }: DocumentFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-soft md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-3">
        <SearchInput value={search} onChange={onSearch} placeholder="Search documents..." className="max-w-md" />
      </div>
      <div className="flex items-center gap-3">
        <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-brand-500">
          <option>All types</option>
          <option>Protocols</option>
          <option>Lab Notebooks</option>
          <option>Literature</option>
          <option>Reports</option>
        </select>
        <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-brand-500">
          <option>Sort: newest</option>
          <option>Sort: oldest</option>
          <option>Sort: name</option>
        </select>
        <Button variant="outline" icon={<SlidersHorizontal className="h-4 w-4" />}>Filter</Button>
      </div>
    </div>
  )
}
