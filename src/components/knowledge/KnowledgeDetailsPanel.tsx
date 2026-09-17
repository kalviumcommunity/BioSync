import type { KnowledgeInsight } from '../../types/knowledge'

interface KnowledgeDetailsPanelProps {
  insight: KnowledgeInsight
}

export function KnowledgeDetailsPanel({ insight }: KnowledgeDetailsPanelProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-4">
        <div className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Entity</div>
        <div className="mt-2 text-2xl font-semibold text-slate-900">{insight.entity}</div>
      </div>
      <div className="grid gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-lg bg-slate-50 p-3">
          <div className="text-slate-500">Type</div>
          <div className="mt-1 font-medium text-slate-900">{insight.type}</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <div className="text-slate-500">Related findings</div>
          <div className="mt-1 font-medium text-slate-900">{insight.relatedFindings}</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <div className="text-slate-500">Experiments</div>
          <div className="mt-1 font-medium text-slate-900">{insight.experiments}</div>
        </div>
      </div>
      <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
        <div className="text-slate-500">Publications</div>
        <div className="mt-1 font-medium text-slate-900">{insight.publications}</div>
      </div>
      <div className="mt-5 rounded-lg border border-brand-100 bg-brand-50 p-4 text-sm leading-6 text-slate-700">
        <span className="font-medium text-brand-700">AI summary:</span> {insight.summary}
      </div>
    </div>
  )
}
