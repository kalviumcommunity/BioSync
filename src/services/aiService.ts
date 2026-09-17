import { aiInsights } from '../data/dashboard'
import { mockRequest } from './api'

export async function getAiInsights() {
  return mockRequest(aiInsights)
}

export async function getAssistantReply(prompt: string) {
  const mockReply = {
    text: 'I found 7 relevant experiments across 3 researchers. The strongest recurring observation is an improvement in cell viability when Compound A is used between 5–10 μM. Evidence: Experiment #EXP-142, Experiment #EXP-157, Lab Notebook #LN-084, Paper #PUB-2026-018. Confidence: 87%.',
    citations: [
      { id: 'EXP-142', label: 'Experiment #EXP-142' },
      { id: 'EXP-157', label: 'Experiment #EXP-157' },
      { id: 'LN-084', label: 'Lab Notebook #LN-084' },
      { id: 'PUB-2026-018', label: 'Paper #PUB-2026-018' }
    ],
    prompt
  }

  return mockRequest(mockReply)
}
