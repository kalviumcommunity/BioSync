interface KnowledgeGraphPreviewProps {
  count: string
}

export function KnowledgeGraphPreview({ count }: KnowledgeGraphPreviewProps) {
  const nodes = [
    { id: 'CRISPR', x: 80, y: 60 },
    { id: 'Gene X', x: 180, y: 150 },
    { id: 'Protein Y', x: 290, y: 70 },
    { id: 'Experiment 142', x: 420, y: 145 },
    { id: 'Compound A', x: 260, y: 220 },
    { id: 'Paper 2025-018', x: 120, y: 250 },
    { id: 'Cell Line B', x: 440, y: 240 }
  ]

  const lines = [
    'M 130 90 L 180 150',
    'M 220 150 L 290 90',
    'M 300 120 L 420 150',
    'M 420 160 L 300 220',
    'M 300 220 L 120 250',
    'M 170 220 L 440 240',
    'M 220 160 L 440 240'
  ]

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Knowledge Network</h3>
        <span className="text-sm text-slate-500">{count}</span>
      </div>
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
        <svg viewBox="0 0 560 320" className="h-64 w-full">
          {lines.map((line) => (
            <path key={line} d={line} stroke="#cbd5e1" strokeWidth="1.5" fill="none" />
          ))}
          {nodes.map((node) => (
            <g key={node.id}>
              <circle cx={node.x} cy={node.y} r="24" fill="#ecfeff" stroke="#0f766e" strokeWidth="1.5" />
              <text x={node.x} y={node.y + 4} textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="600">{node.id}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="mt-4">
        <button className="inline-flex items-center rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700">Explore Knowledge Graph</button>
      </div>
    </div>
  )
}
