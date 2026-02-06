import type { GamesQueryParams } from '$lib/rawg'

export const gameQueryKeys = {
  all: ['games'],
  infinite: (filters?: GamesQueryParams) => [...gameQueryKeys.all, 'infinite', filters || 'all'],
  detail: (id: string | number) => [...gameQueryKeys.all, 'detail', id],
  screenshots: (id: string | number) => [...gameQueryKeys.all, 'screenshots', id],
  platformsParents: () => [...gameQueryKeys.all, 'platforms']
} as const
