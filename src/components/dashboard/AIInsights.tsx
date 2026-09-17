import { Sparkles } from 'lucide-react'
import { Button } from '../common/Button'

interface Insight {
  title: string
  action: string
}

interface AIInsightsProps {
  insights: Insight[]
}

export function AIInsights({ insights }: AIInsightsProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-brand-600" />
        <h3 className="text-lg font-semibold text-slate-900">AI Research Insights</h3>
      </div>
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-brand-700">AI-generated insights</div>
            <p className="text-sm leading-6 text-slate-700">{insight.title}</p>
            <div className="mt-3">
              <Button variant="secondary" className="!px-3 !py-2 !text-xs">{insight.action}</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
