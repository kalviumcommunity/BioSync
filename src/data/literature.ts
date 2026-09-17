import type { LiteraturePaper } from '../types/literature'

export const literaturePapers: LiteraturePaper[] = [
  {
    id: 'PUB-2026-018',
    title: 'Advances in Targeted mRNA Delivery',
    authors: ['A. Patel', 'S. Nguyen', 'L. Chen'],
    journal: 'Nature Biotechnology',
    year: 2026,
    keyFindings: ['Improved delivery efficiencies', 'Reduced cytotoxicity profile'],
    relatedExperiments: ['EXP-163', 'EXP-142']
  },
  {
    id: 'PUB-2026-024',
    title: 'CRISPR Editing Efficiency Across Cell Lines',
    authors: ['R. Johnson', 'T. Silva'],
    journal: 'Cell',
    year: 2026,
    keyFindings: ['Cell-line dependency', 'Guide optimization recommendations'],
    relatedExperiments: ['EXP-142']
  },
  {
    id: 'PUB-2025-112',
    title: 'Mechanisms of Protein Misfolding',
    authors: ['D. Moore', 'Y. Ibrahim'],
    journal: 'Nature Reviews Molecular Cell Biology',
    year: 2025,
    keyFindings: ['Thermal stress triggers aggregation', 'Molecular chaperone response'],
    relatedExperiments: ['EXP-159']
  }
]
