<script lang="ts">
  // import GamesGrid from '$lib/components/games-grid.svelte'
  import { gameQueryOptions } from '$lib/query-options'
  import { createInfiniteQuery, createQuery } from '@tanstack/svelte-query'

  const data = createInfiniteQuery(gameQueryOptions)

  console.log(data)
</script>

<!-- <GamesGrid /> -->

<h1>Hi</h1>
