interface EvidenceCardProps {
  label: string
}

export function EvidenceCard({ label }: EvidenceCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
      {label}
    </div>
  )
}
