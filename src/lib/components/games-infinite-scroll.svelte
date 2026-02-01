<script lang="ts">
  import GamesGrid from '$lib/components/games-grid.svelte'
  import { gameQueryOptions } from '$lib/query-options'
  import { createInfiniteQuery } from '@tanstack/svelte-query'

  import { Spinner } from '$lib/components/ui/spinner'

  import { useIntersectionObserver } from 'runed'

  let target = $state<HTMLElement | null>(null)

  let isIntersecting = $state(false)

  const query = createInfiniteQuery(gameQueryOptions)

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

<div class="container mx-auto px-6 py-6">
  {#if query.isFetchingNextPage}
    <h1>loading...</h1>
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
</div>
