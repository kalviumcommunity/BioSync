export type KnowledgeEntityType = 'Experiment' | 'Protein' | 'Gene' | 'Compound' | 'Protocol' | 'Publication'
export type KnowledgeRelationshipType = 'Supports' | 'Contradicts' | 'References' | 'Derived From' | 'Related To'

export interface KnowledgeNode {
  id: string
  label: string
  type: KnowledgeEntityType
  x: number
  y: number
}

export interface KnowledgeConnection {
  source: string
  target: string
  type: KnowledgeRelationshipType
}

export interface KnowledgeInsight {
  entity: string
  type: KnowledgeEntityType
  relatedFindings: number
  experiments: number
  publications: number
  summary: string
}
