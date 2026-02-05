import { type FetchContext, ofetch } from 'ofetch'
import type {
  GameDetailResponse,
  GameLits,
  GamesListResponse,
  GamesQueryParams,
  PlatformsParentsResponse,
  ScreenshotsListResponse,
  TrailersListResponse
} from './types'

const CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.rawg.io/api',
  RAWG_API_KEY: import.meta.env.VITE_RAWG_API_KEY,
  REQUEST_TIMEOUT: 30000, // 30 seconds
  MAX_RETRIES: 1,
  BASE_RETRY_DELAY: 250,
  MAX_RETRY_JITTER: 250
} as const

if (!CONFIG.RAWG_API_KEY) {
  throw new Error('API key is required but not found in environment variables')
}

const rawgApi = ofetch.create({
  baseURL: CONFIG.API_BASE_URL,
  timeout: CONFIG.REQUEST_TIMEOUT,
  retry: CONFIG.MAX_RETRIES,
  onRequest({ options }: FetchContext) {
    options.retryDelay ??=
      CONFIG.BASE_RETRY_DELAY + Math.floor(Math.random() * CONFIG.MAX_RETRY_JITTER)

    const query = (options.query ?? {}) as Record<string, unknown>
    query.key = CONFIG.RAWG_API_KEY
    options.query = query
  },
  onRequestError({ response }: FetchContext) {
    if (response && import.meta.env.DEV) {
      console.error(`RAWG API Error: ${response.status} ${response.statusText}`)
    }
  }
})

function sanitizeParams(params?: GamesQueryParams) {
  if (!params) return undefined
  return Object.fromEntries(Object.entries(params).filter(([_, v]) => v !== null))
}

async function fetchRawgData<T>(
  endpoint: string,
  params?: GamesQueryParams,
  signal?: AbortSignal
): Promise<T> {
  return await rawgApi<T>(endpoint, {
    query: sanitizeParams(params),
    signal
  })
}

type ParamsRequest<T extends GamesQueryParams> = {
  params: T
  signal?: AbortSignal
}

const endpoints = {
  games: 'games',
  gameLists: (list: string) => `games/lists/${list}`,
  gameDetails: (slug: string) => `games/${slug}`,
  gameScreenshots: (slug: string) => `games/${slug}/screenshots`,
  gameTrailers: (slug: string) => `games/${slug}/movies`,
  platformsParents: 'platforms/lists/parents'
} as const

function createParamsEndpoint<TResult, TParams extends GamesQueryParams>(endpoint: string) {
  return ({ params, signal }: ParamsRequest<TParams>): Promise<TResult> =>
    fetchRawgData(endpoint, params, signal)
}

function createSignalEndpoint<TResult>(endpoint: string) {
  return (signal?: AbortSignal): Promise<TResult> => fetchRawgData(endpoint, undefined, signal)
}

function createSlugEndpoint<TResult>(endpoint: (slug: string) => string) {
  return (slug: string, signal?: AbortSignal): Promise<TResult> =>
    fetchRawgData(endpoint(slug), undefined, signal)
}

function createListEndpoint<TResult>(endpoint: (list: string) => string) {
  return ({ list = 'main', params, signal }: GameLits): Promise<TResult> =>
    fetchRawgData(endpoint(list), params, signal)
}

export const getGameLists = createListEndpoint<GamesListResponse>(endpoints.gameLists)
export const getGames = createParamsEndpoint<GamesListResponse, GamesQueryParams>(endpoints.games)
export const getGameDetails = createSlugEndpoint<GameDetailResponse>(endpoints.gameDetails)
export const getGameScreenshots = createSlugEndpoint<ScreenshotsListResponse>(
  endpoints.gameScreenshots
)
export const getGameTrailers = createSlugEndpoint<TrailersListResponse>(endpoints.gameTrailers)
export const getPlatformsParents = createSignalEndpoint<PlatformsParentsResponse>(
  endpoints.platformsParents
)
