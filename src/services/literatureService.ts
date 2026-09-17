import { literaturePapers } from '../data/literature'
import type { LiteraturePaper } from '../types/literature'
import { mockRequest } from './api'

export async function getLiterature(): Promise<LiteraturePaper[]> {
  return mockRequest(literaturePapers)
}
