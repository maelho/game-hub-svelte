import { useSearchParams } from 'runed/kit'
import * as v from 'valibot'

export const gameFilterParams = v.object({
  ordering: v.optional(v.fallback(v.string(), '-relevance'), '-relevance'),
  parent_platforms: v.optional(v.fallback(v.string(), ''), ''),
  search: v.optional(v.fallback(v.string(), ''), '')
})

export type filtersParams = v.InferOutput<typeof gameFilterParams>

export function useGameFilters() {
  return useSearchParams(gameFilterParams, {
    pushHistory: false,
    noScroll: true
  })
}

export type GameFiltersReturn = ReturnType<typeof useGameFilters>
