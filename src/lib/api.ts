import type { CloudResource, CloudProvider } from "../types/resource"

interface Product {
  id: number
  title: string
  price: number
  rating: number
  stock: number
}

interface ProductResponse {
  products: Product[]
}

const providers: CloudProvider[] = [
  "AWS",
  "Azure",
  "GCP",
  "On-Premise",
]

const workloadNames = [
  "Production Compute Cluster",
  "Analytics Processing Node",
  "Customer API Workload",
  "Data Processing Cluster",
  "Web Application Node",
  "ML Inference Workload",
  "Storage Processing Node",
  "Edge Compute Workload",
]

export async function fetchCloudResources(): Promise<CloudResource[]> {
  const response = await fetch(
    "https://dummyjson.com/products?limit=8",
  )

  if (!response.ok) {
    throw new Error("Unable to load optimization data")
  }

  const data: ProductResponse = await response.json()

  return data.products.map((product, index) => {
    const cpu = Math.round(Math.min(95, product.rating * 18))
    const ram = Math.round(Math.min(95, product.stock * 1.8))
    const gpu = Math.round(Math.min(90, product.price / 3))
    const storage = Math.round(Math.min(95, product.stock * 1.4))
    const network = Math.round(Math.min(95, product.rating * 20))

    const average =
      (cpu + ram + gpu + storage + network) / 5

    const efficiency = Math.round(
      Math.min(96, Math.max(42, average)),
    )

    return {
      id: product.id,
      provider: providers[index % providers.length],
      name: workloadNames[index % workloadNames.length],
      metrics: {
        cpu,
        ram,
        gpu,
        storage,
        network,
      },
      efficiency,
      potentialSavings: Math.round(100 - efficiency),
    }
  })
}