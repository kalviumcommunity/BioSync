export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const futureApiRoutes = {
  auth: '/api/auth/',
  documents: '/api/documents/',
  experiments: '/api/experiments/',
  literature: '/api/literature/',
  knowledge: '/api/knowledge/',
  search: '/api/search/',
  aiChat: '/api/ai/chat/',
  aiSummarize: '/api/ai/summarize/',
  aiInsights: '/api/ai/insights/'
}

export async function mockRequest<T>(data: T, delay = 300): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, delay))
  return data
}
