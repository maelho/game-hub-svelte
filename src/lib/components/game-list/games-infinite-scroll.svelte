<script lang="ts">
  import { createInfiniteQuery } from '@tanstack/svelte-query'
  import { useIntersectionObserver } from 'runed'
  import type { GameFiltersReturn } from '$lib/hooks/useGameFilters.svelte'
  import { gameQueryOptions } from '$lib/queries/query-options'
  import { LoadingScreen, Spinner } from '$lib/components/ui/spinner'
  import GamesGrid from './games-grid.svelte'

  let { filters }: { filters: GameFiltersReturn } = $props()

  let target = $state<HTMLElement | null>(null)
  let isIntersecting = $state(false)

  const query = createInfiniteQuery(() =>
    gameQueryOptions({
      ordering: filters.ordering,
      parent_platforms: filters.parent_platforms,
      search: filters.search
    })
  )

  useIntersectionObserver(
    () => target,
    (entries) => {
      const entry = entries[0]
      if (!entry) return
      isIntersecting = entry.isIntersecting
    },
    { rootMargin: '400px' }
  )

  $effect(() => {
    if (isIntersecting && query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage()
    }
  })
</script>

{#if query.isLoading}
  <LoadingScreen message="Loading games..." />
{:else if query.error}
  <span>Error {query.error.message}</span>
{/if}

{#if query.isSuccess}
  <GamesGrid data={query.data.pages} />
  <div
    bind:this={target}
    class="col-span-full flex min-h-20 w-full items-center justify-center py-4"
  >
    {#if query.isFetchingNextPage || (query.hasNextPage && isIntersecting)}
      <Spinner class="size-10" />
    {/if}
  </div>
{/if}
