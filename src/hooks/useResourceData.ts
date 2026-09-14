import { useQuery } from "@tanstack/react-query"

import { fetchCloudResources } from "../lib/api"

export function useResourceData() {
  return useQuery({
    queryKey: ["cloud-resources"],
    queryFn: fetchCloudResources,

    // Data stays fresh for 5 minutes.
    // Revisiting the section during this period
    // uses the cached response.
    staleTime: 1000 * 60 * 5,

    // Keep unused cached data available for 30 minutes.
    gcTime: 1000 * 60 * 30,

    // Avoid an unnecessary request simply because
    // the browser window receives focus again.
    refetchOnWindowFocus: false,
  })
}