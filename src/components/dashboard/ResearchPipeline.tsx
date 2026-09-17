interface PipelineStage {
  title: string
  count: number
  status: string
  progress: number
}

interface ResearchPipelineProps {
  stages: PipelineStage[]
}

export function ResearchPipeline({ stages }: ResearchPipelineProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
      <h3 className="text-lg font-semibold text-slate-900">Research Pipeline</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stages.map((stage) => (
          <div key={stage.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-slate-700">{stage.title}</div>
              <span className="text-xs text-slate-500">{stage.status}</span>
            </div>
            <div className="mt-4 text-2xl font-semibold text-slate-900">{stage.count}</div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full rounded-full bg-brand-600" style={{ width: `${stage.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
