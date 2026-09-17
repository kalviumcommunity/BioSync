export function KnowledgeFilters() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
      <div className="space-y-5">
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Entity Types</div>
          <div className="space-y-2 text-sm text-slate-600">
            {['Experiments', 'Proteins', 'Genes', 'Compounds', 'Protocols', 'Publications'].map((item) => (
              <label key={item} className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-brand-600" />
                {item}
              </label>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Relationships</div>
          <div className="space-y-2 text-sm text-slate-600">
            {['Supports', 'Contradicts', 'References', 'Derived From', 'Related To'].map((item) => (
              <label key={item} className="flex items-center gap-3">
                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-brand-600" />
                {item}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
