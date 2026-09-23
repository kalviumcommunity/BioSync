import { Activity, FlaskConical, PlayCircle } from 'lucide-react'
import { PageContainer } from '../layout/PageContainer'
import { ExperimentCard } from './ExperimentCard'
import { experiments } from '../../data/experiments'

const statusOrder = ['Active', 'Analysis', 'Planning', 'Completed']

export function ExperimentPulsePage() {
  const activeExperiments = experiments.filter((experiment) => experiment.status !== 'Completed')

  return (
    <PageContainer
      title="Experiment Pulse"
      subtitle="Monitor study progress and quickly return to the work moving forward."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statusOrder.map((status) => {
          const count = experiments.filter((experiment) => experiment.status === status).length
          return (
            <div key={status} className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>{status}</span>
                <FlaskConical className="h-4 w-4 text-brand-600" />
              </div>
              <div className="mt-3 text-3xl font-semibold text-slate-900">{count}</div>
              <div className="mt-1 text-xs text-slate-500">{count === 1 ? 'experiment' : 'experiments'}</div>
            </div>
          )
        })}
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">In motion</h2>
            <p className="mt-1 text-sm text-slate-500">Studies with unfinished work or recent analysis.</p>
          </div>
          <Activity className="h-5 w-5 text-brand-600" />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {activeExperiments.map((experiment) => (
            <ExperimentCard key={experiment.id} {...experiment} area={experiment.researchArea} />
          ))}
        </div>
        {activeExperiments.length === 0 && (
          <div className="mt-5 flex items-center gap-2 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
            <PlayCircle className="h-4 w-4" /> All experiments are complete.
          </div>
        )}
      </section>
    </PageContainer>
  )
}