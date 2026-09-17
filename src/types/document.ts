export type DocumentType = 'Protocol' | 'Lab Notebook' | 'Literature' | 'Report'
export type DocumentStatus = 'Indexed' | 'Processing' | 'Review' | 'Archived'

export interface ResearchDocument {
  id: string
  title: string
  type: DocumentType
  author: string
  createdAt: string
  updatedAt: string
  status: DocumentStatus
  tags: string[]
  researchArea: string
}
