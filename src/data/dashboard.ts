export const metrics = [
  { id: 'documents', label: 'Research Documents', value: '1,284', trend: '+12.4%', detail: 'this month', icon: 'FileText' },
  { id: 'experiments', label: 'Experiments', value: '86', trend: '8 active', detail: 'current pipeline', icon: 'FlaskConical' },
  { id: 'knowledge', label: 'Knowledge Connections', value: '12,438', trend: '+18.2%', detail: 'this quarter', icon: 'Network' },
  { id: 'papers', label: 'Published Papers', value: '342', trend: '24 added', detail: 'this month', icon: 'BookOpen' },
  { id: 'queries', label: 'AI Queries', value: '1,847', trend: '+31.6%', detail: 'over past 30 days', icon: 'Sparkles' }
]

export const activityData = [
  { month: 'April', Documents: 142, Experiments: 8, Literature: 34 },
  { month: 'May', Documents: 168, Experiments: 11, Literature: 41 },
  { month: 'June', Documents: 193, Experiments: 14, Literature: 48 },
  { month: 'July', Documents: 215, Experiments: 12, Literature: 56 },
  { month: 'August', Documents: 244, Experiments: 18, Literature: 63 },
  { month: 'September', Documents: 286, Experiments: 21, Literature: 71 }
]

export const pipelineStages = [
  { title: 'Data Collection', count: 24, status: 'Active', progress: 76 },
  { title: 'Experimentation', count: 8, status: 'Active', progress: 62 },
  { title: 'Analysis', count: 12, status: 'Pending', progress: 48 },
  { title: 'Validation', count: 6, status: 'Pending', progress: 35 },
  { title: 'Publication', count: 4, status: 'In progress', progress: 52 }
]

export const recentResearch = [
  { id: 'exp-1', title: 'CRISPR-Cas9 Off-Target Analysis', type: 'Experiment', researcher: 'Dr. Sarah Chen', updated: '2 hours ago', status: 'Active' },
  { id: 'prot-1', title: 'Protein Folding Stability Study', type: 'Protocol', researcher: 'Dr. Michael Lee', updated: '5 hours ago', status: 'Reviewed' },
  { id: 'lit-1', title: 'mRNA Delivery Mechanisms', type: 'Literature', researcher: 'Dr. Emily Watson', updated: 'Yesterday', status: 'Indexed' },
  { id: 'note-1', title: 'Cell Viability Under Hypoxic Conditions', type: 'Lab Notebook', researcher: 'Dr. James Park', updated: 'Yesterday', status: 'Processing' }
]

export const aiInsights = [
  { title: '3 experiments report improved cell viability under the same compound concentration.', action: 'Explore evidence' },
  { title: 'Two protocols use different incubation times for similar experimental conditions.', action: 'Compare protocols' },
  { title: 'Recent literature suggests a potential relationship between pathway X and marker Y.', action: 'View connections' }
]

export const graphNodes = [
  { id: 'crisp', label: 'CRISPR', x: 120, y: 110 },
  { id: 'gene-x', label: 'Gene X', x: 250, y: 200 },
  { id: 'protein-y', label: 'Protein Y', x: 380, y: 120 },
  { id: 'exp-142', label: 'Experiment 142', x: 520, y: 180 },
  { id: 'compound-a', label: 'Compound A', x: 350, y: 300 },
  { id: 'paper-2025-018', label: 'Paper 2025-018', x: 170, y: 340 },
  { id: 'cell-line-b', label: 'Cell Line B', x: 520, y: 330 }
]

export const graphConnections = [
  { source: 'crisp', target: 'gene-x', type: 'Related To' },
  { source: 'gene-x', target: 'protein-y', type: 'Derived From' },
  { source: 'protein-y', target: 'exp-142', type: 'Supports' },
  { source: 'exp-142', target: 'compound-a', type: 'Related To' },
  { source: 'compound-a', target: 'paper-2025-018', type: 'References' },
  { source: 'paper-2025-018', target: 'cell-line-b', type: 'Supports' },
  { source: 'gene-x', target: 'cell-line-b', type: 'Related To' }
]
