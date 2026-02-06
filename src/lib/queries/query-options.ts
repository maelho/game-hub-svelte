import { infiniteQueryOptions, queryOptions } from '@tanstack/svelte-query'
import {
  getGameDetails,
  getGameLists,
  getGameScreenshots,
  getGames,
  getPlatformsParents
} from '$lib/rawg'
import type { GamesQueryParams } from '$lib/rawg/types'
import { gameQueryKeys } from './query-keys'

const DEFAULT_PAGE_SIZE = 30

const STALE_TIMES = {
  games: 10 * 60 * 1000, // 10 minutes
  gameDetails: 30 * 60 * 1000, // 30 minutes
  platform: 24 * 60 * 60 * 1000, // 24 hours
  gameMedia: 60 * 60 * 1000 // 1 hour
}

function withCacheTimes(staleTime: number, gcMultiplier = 1) {
  return {
    staleTime,
    gcTIme: staleTime * gcMultiplier
  }
}

const defaultQueryOptions = {
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  retry: 2
}

export function gameQueryOptions(filters?: GamesQueryParams) {
  return infiniteQueryOptions({
    queryKey: gameQueryKeys.infinite(filters),
    queryFn: ({ pageParam = 1, signal }) => {
      let search = filters?.search

      const commonParams = {
        parent_platforms: filters?.parent_platforms,
        ordering: filters?.ordering,
        page: pageParam,
        page_size: DEFAULT_PAGE_SIZE
      }

      if (search) {
        return getGames({
          params: {
            ...commonParams,
            search
          },
          signal
        })
      }

      return getGameLists({
        params: {
          ...commonParams,
          discover: true
        },
        signal
      })
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.next ? lastPageParam + 1 : undefined,
    ...defaultQueryOptions,
    ...withCacheTimes(STALE_TIMES.games, 2)
  })
}

export function gameDetailsQueryOptions(slug: string) {
  return queryOptions({
    queryKey: gameQueryKeys.detail(slug),
    queryFn: () => getGameDetails(slug),
    ...defaultQueryOptions,
    ...withCacheTimes(STALE_TIMES.games, 2),
    enabled: !!slug
  })
}

export function gameScreenshotsQueryOptions(slug: string) {
  return queryOptions({
    queryKey: gameQueryKeys.screenshots(slug),
    queryFn: () => getGameScreenshots(slug),
    ...defaultQueryOptions,
    ...withCacheTimes(STALE_TIMES.games, 2),
    enabled: !!slug
  })
}

export function platformsQueryOptions() {
  return queryOptions({
    queryKey: gameQueryKeys.platformsParents(),
    queryFn: () => getPlatformsParents(),
    ...defaultQueryOptions,
    ...withCacheTimes(STALE_TIMES.games, 2)
  })
}
