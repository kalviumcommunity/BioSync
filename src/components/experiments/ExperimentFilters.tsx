import { SearchInput } from '../common/SearchInput'

interface ExperimentFiltersProps {
  search: string
  onSearch: (value: string) => void
}

export function ExperimentFilters({ search, onSearch }: ExperimentFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-soft md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 gap-3">
        <SearchInput value={search} onChange={onSearch} placeholder="Search experiments..." className="max-w-md" />
      </div>
      <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-brand-500">
        <option>Filter by status</option>
        <option>Planning</option>
        <option>Active</option>
        <option>Analysis</option>
        <option>Completed</option>
      </select>
    </div>
  )
}
