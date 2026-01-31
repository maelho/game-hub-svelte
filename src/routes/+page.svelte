<script lang="ts">
  import GamesGrid from '$lib/components/games-grid.svelte'
  import { gameQueryOptions } from '$lib/query-options'
  import { createInfiniteQuery } from '@tanstack/svelte-query'

  const gameInfiniteQuery = createInfiniteQuery(gameQueryOptions)
</script>

<div class="container mx-auto px-6 py-6">
  {#if gameInfiniteQuery.isFetching}
    <h1>loading...</h1>
  {:else if gameInfiniteQuery.isSuccess}
    <GamesGrid data={gameInfiniteQuery.data.pages} />
  {/if}
</div>
