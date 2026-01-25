import { browser } from '$app/environment'
import { QueryClient } from '@tanstack/svelte-query'

let queryClient: QueryClient | undefined = undefined

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser
      }
    }
  })
}

export function getQueryClient() {
  if (!browser) {
    return createQueryClient()
  }

  queryClient ??= createQueryClient()

  return queryClient
}
