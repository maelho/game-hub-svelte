import {
  createListEndpoint,
  createParamsEndpoint,
  createSlugEndpoint,
  createSignalEndpoint
} from './api-client'

import type {
  GamesListResponse,
  GamesQueryParams,
  GameDetailResponse,
  ScreenshotsListResponse,
  PlatformsParentsResponse
} from './types'

const endpoints = {
  games: 'games',
  gameLists: (list: string) => `games/lists/${list}`,
  gameDetails: (slug: string) => `games/${slug}`,
  gameScreenshots: (slug: string) => `games/${slug}/screenshots`,
  gameTrailers: (slug: string) => `games/${slug}/movies`,
  platformsParents: 'platforms/lists/parents'
} as const

export const getGameLists = createListEndpoint<GamesListResponse>(endpoints.gameLists)
export const getGames = createParamsEndpoint<GamesListResponse, GamesQueryParams>(endpoints.games)
export const getGameDetails = createSlugEndpoint<GameDetailResponse>(endpoints.gameDetails)
export const getGameScreenshots = createSlugEndpoint<ScreenshotsListResponse>(
  endpoints.gameScreenshots
)
export const getPlatformsParents = createSignalEndpoint<PlatformsParentsResponse>(
  endpoints.platformsParents
)
