import { Button } from '../common/Button'

interface LiteratureCardProps {
  title: string
  authors: string[]
  journal: string
  year: number
  keyFindings: string[]
  relatedExperiments: string[]
}

export function LiteratureCard({ title, authors, journal, year, keyFindings, relatedExperiments }: LiteratureCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft transition hover:border-slate-300">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <div className="mt-1 text-sm text-slate-500">{authors.join(', ')}</div>
        </div>
        <div className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{year}</div>
      </div>
      <div className="mt-4 text-sm font-medium text-brand-700">{journal}</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-600">
        {keyFindings.map((finding) => (
          <li key={finding} className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-600" />
            <span>{finding}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-sm text-slate-500">Related experiments: {relatedExperiments.join(', ')}</div>
      <div className="mt-5 flex gap-3">
        <Button variant="secondary" className="!px-3 !py-2 !text-xs">View evidence</Button>
        <Button variant="outline" className="!px-3 !py-2 !text-xs">Find related research</Button>
      </div>
    </div>
  )
}
