export type ExperimentStatus = 'Planning' | 'Active' | 'Analysis' | 'Completed'

export interface Experiment {
  id: string
  name: string
  researchArea: string
  owner: string
  status: ExperimentStatus
  startedAt: string
  lastActivity: string
}
