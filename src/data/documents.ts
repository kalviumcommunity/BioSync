import type { ResearchDocument } from '../types/document'

export const documents: ResearchDocument[] = [
  {
    id: 'doc-1',
    title: 'CRISPR Protocol v4',
    type: 'Protocol',
    author: 'Dr. Sarah Chen',
    createdAt: 'Sep 12, 2026',
    updatedAt: 'Sep 15, 2026',
    status: 'Indexed',
    tags: ['Gene Editing', 'CRISPR'],
    researchArea: 'Genomics'
  },
  {
    id: 'doc-2',
    title: 'Cell Culture Optimization',
    type: 'Lab Notebook',
    author: 'Dr. James Park',
    createdAt: 'Sep 10, 2026',
    updatedAt: 'Sep 16, 2026',
    status: 'Indexed',
    tags: ['Cell Culture', 'Optimization'],
    researchArea: 'Cell Biology'
  },
  {
    id: 'doc-3',
    title: 'Protein Stability Review',
    type: 'Literature',
    author: 'Dr. Emily Watson',
    createdAt: 'Sep 08, 2026',
    updatedAt: 'Sep 14, 2026',
    status: 'Processing',
    tags: ['Protein', 'Stability'],
    researchArea: 'Biophysics'
  },
  {
    id: 'doc-4',
    title: 'Compound Screening Summary',
    type: 'Report',
    author: 'Dr. Michael Lee',
    createdAt: 'Sep 04, 2026',
    updatedAt: 'Sep 08, 2026',
    status: 'Review',
    tags: ['Compound', 'Screening'],
    researchArea: 'Drug Discovery'
  }
]

export const documentTabs = ['All', 'Protocols', 'Lab Notebooks', 'Literature', 'Reports'] as const
