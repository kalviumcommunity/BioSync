import { documents } from '../data/documents'
import type { ResearchDocument } from '../types/document'
import { mockRequest } from './api'

export async function getDocuments(): Promise<ResearchDocument[]> {
  return mockRequest(documents)
}

export async function getDocumentById(id: string): Promise<ResearchDocument | undefined> {
  return mockRequest(documents.find((doc) => doc.id === id))
}
