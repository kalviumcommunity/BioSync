import { experiments } from '../data/experiments'
import type { Experiment } from '../types/experiment'
import { mockRequest } from './api'

export async function getExperiments(): Promise<Experiment[]> {
  return mockRequest(experiments)
}
