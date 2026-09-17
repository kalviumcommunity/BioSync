import { SearchInput } from '../common/SearchInput'

interface LiteratureFiltersProps {
  search: string
  onSearch: (value: string) => void
}

export function LiteratureFilters({ search, onSearch }: LiteratureFiltersProps) {
  return (
    <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-soft md:grid-cols-4">
      <SearchInput value={search} onChange={onSearch} placeholder="Search papers, authors, concepts..." className="md:col-span-2" />
      <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-brand-500">
        <option>Research area</option>
        <option>Genomics</option>
        <option>Cell Biology</option>
        <option>Drug Discovery</option>
      </select>
      <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-brand-500">
        <option>Publication year</option>
        <option>2026</option>
        <option>2025</option>
      </select>
    </div>
  )
}
