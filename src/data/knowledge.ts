import type { KnowledgeConnection, KnowledgeInsight, KnowledgeNode } from '../types/knowledge'

export const knowledgeNodes: KnowledgeNode[] = [
  { id: 'crisper', label: 'CRISPR', type: 'Experiment', x: 110, y: 95 },
  { id: 'gene-x', label: 'Gene X', type: 'Gene', x: 250, y: 180 },
  { id: 'protein-y', label: 'Protein Y', type: 'Protein', x: 370, y: 105 },
  { id: 'exp-142', label: 'Experiment 142', type: 'Experiment', x: 520, y: 180 },
  { id: 'compound-a', label: 'Compound A', type: 'Compound', x: 360, y: 310 },
  { id: 'paper-2025-018', label: 'Paper 2025-018', type: 'Publication', x: 150, y: 320 },
  { id: 'cell-line-b', label: 'Cell Line B', type: 'Experiment', x: 520, y: 320 }
]

export const knowledgeConnections: KnowledgeConnection[] = [
  { source: 'crisper', target: 'gene-x', type: 'Related To' },
  { source: 'gene-x', target: 'protein-y', type: 'Derived From' },
  { source: 'protein-y', target: 'exp-142', type: 'Supports' },
  { source: 'exp-142', target: 'compound-a', type: 'Related To' },
  { source: 'compound-a', target: 'paper-2025-018', type: 'References' },
  { source: 'paper-2025-018', target: 'cell-line-b', type: 'Supports' },
  { source: 'gene-x', target: 'cell-line-b', type: 'Related To' }
]

export const knowledgeInsight: KnowledgeInsight = {
  entity: 'Gene X',
  type: 'Gene',
  relatedFindings: 4,
  experiments: 7,
  publications: 12,
  summary: 'Gene X appears in 7 experiments and 12 publications. Recent evidence suggests a strong association with improved viability under select metabolic conditions.'
}
