import type { KnowledgeConnection, KnowledgeNode } from '../../types/knowledge'

interface KnowledgeGraphProps {
  nodes: KnowledgeNode[]
  connections: KnowledgeConnection[]
}

export function KnowledgeGraph({ nodes, connections }: KnowledgeGraphProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-soft">
      <svg viewBox="0 0 700 420" className="h-[420px] w-full rounded-lg bg-slate-50">
        {connections.map((connection, index) => {
          const from = nodes.find((node) => node.id === connection.source)
          const to = nodes.find((node) => node.id === connection.target)
          if (!from || !to) return null
          return (
            <line
              key={`${connection.source}-${connection.target}-${index}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#cbd5e1"
              strokeWidth="1.5"
              strokeDasharray={connection.type === 'Contradicts' ? '6 4' : '0'}
            />
          )
        })}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r="26" fill="#ecfeff" stroke="#0f766e" strokeWidth="1.5" />
            <text x={node.x} y={node.y + 5} textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="600">
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
