export function LoadingState() {
  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-200 border-t-brand-600" />
        Loading research data...
      </div>
    </div>
  )
}
