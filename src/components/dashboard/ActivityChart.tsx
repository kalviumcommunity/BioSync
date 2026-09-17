import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface ActivityChartProps {
  data: Array<{ month: string; Documents: number; Experiments: number; Literature: number }>
}

export function ActivityChart({ data }: ActivityChartProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Research Activity</h3>
          <p className="text-sm text-slate-500">Documents, experiments and literature added over time</p>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 12, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="documentsFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#0f766e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0f766e" stopOpacity={0.04} />
              </linearGradient>
              <linearGradient id="experimentsFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.03} />
              </linearGradient>
              <linearGradient id="literatureFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 8px 24px rgba(15,23,42,0.08)' }}
            />
            <Legend />
            <Area type="monotone" dataKey="Documents" stroke="#0f766e" fill="url(#documentsFill)" strokeWidth={2.5} />
            <Area type="monotone" dataKey="Experiments" stroke="#3b82f6" fill="url(#experimentsFill)" strokeWidth={2.5} />
            <Area type="monotone" dataKey="Literature" stroke="#8b5cf6" fill="url(#literatureFill)" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
