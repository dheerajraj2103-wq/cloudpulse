export type CloudProvider = "AWS" | "Azure" | "GCP" | "On-Premise"

export interface ResourceMetrics {
  cpu: number
  ram: number
  gpu: number
  storage: number
  network: number
}

export interface CloudResource {
  id: number
  provider: CloudProvider
  name: string
  metrics: ResourceMetrics
  efficiency: number
  potentialSavings: number
}