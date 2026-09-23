import { ArrowUpRight, CheckCircle2, Clock3 } from 'lucide-react'
import { PageContainer } from '../layout/PageContainer'
import { Button } from '../common/Button'
import { activityItems } from '../../data/activity'
import { metrics } from '../../data/dashboard'

const priorities = [
  { title: 'Review pending document annotations', owner: 'You', due: 'Today' },
  { title: 'Compare CRISPR protocol revisions', owner: 'Dr. Park', due: 'Tomorrow' },
  { title: 'Validate Compound A evidence', owner: 'AI Assistant', due: 'Friday' }
]

export function ResearchBriefPage() {
  return (
    <PageContainer
      title="Research Brief"
      subtitle="A focused view of what changed and what needs attention this week."
      actions={<Button icon={<ArrowUpRight className="h-4 w-4" />}>Share brief</Button>}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {metrics.slice(0, 3).map((metric) => (
          <div key={metric.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="text-sm text-slate-500">{metric.label}</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</div>
            <div className="mt-1 text-xs text-emerald-600">{metric.trend}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-900">Priority queue</h2>
          <div className="mt-4 space-y-3">
            {priorities.map((priority) => (
              <div key={priority.title} className="flex items-start gap-3 rounded-lg border border-slate-200 p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-brand-600" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-slate-800">{priority.title}</div>
                  <div className="mt-1 text-xs text-slate-500">{priority.owner} · Due {priority.due}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="text-lg font-semibold text-slate-900">Latest signals</h2>
          <div className="mt-4 space-y-4">
            {activityItems.slice(0, 3).map((item) => (
              <div key={item.id} className="flex gap-3">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                <div>
                  <div className="text-sm text-slate-700">{item.title}</div>
                  <div className="mt-1 text-xs text-slate-500">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  )
}