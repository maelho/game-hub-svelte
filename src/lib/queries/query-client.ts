import { browser } from '$app/environment'
import { type Query, QueryClient } from '@tanstack/svelte-query'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import {
  persistQueryClient,
  type PersistQueryClientOptions
} from '@tanstack/query-persist-client-core'
import { platformsQueryOptions } from './query-options'

let queryClient: QueryClient | undefined = undefined

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 24 * 60 * 60 * 1000,
        experimental_prefetchInRender: true,
        networkMode: 'offlineFirst',
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 1,
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

const persister = createAsyncStoragePersister({
  storage: browser ? window.localStorage : undefined,
  key: 'GAME-HUB_QUERY_CACHE',
  throttleTime: 1000
})

export const persistOptions: Omit<PersistQueryClientOptions, 'queryClient'> = {
  persister,
  maxAge: 24 * 60 * 60 * 1000,
  buster: 'v1',
  dehydrateOptions: {
    shouldDehydrateQuery: (query: Query) => {
      if (query.state.status !== 'success') return false

      const [scope, type] = query.queryKey

      if (scope !== 'games') return false

      return type === 'platforms' || type === 'detail' || type === 'screenshots'
    }
  }
}

if (browser) {
  persistQueryClient({
    queryClient: getQueryClient(),
    ...persistOptions
  })

  getQueryClient().prefetchQuery(platformsQueryOptions())
}
