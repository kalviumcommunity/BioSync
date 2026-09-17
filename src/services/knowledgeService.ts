import { knowledgeConnections, knowledgeInsight, knowledgeNodes } from '../data/knowledge'
import { mockRequest } from './api'

export async function getKnowledgeGraph() {
  return mockRequest({ nodes: knowledgeNodes, connections: knowledgeConnections })
}

export async function getKnowledgeInsight() {
  return mockRequest(knowledgeInsight)
}
