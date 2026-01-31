<script lang="ts">
  import type { Game, GamesListResponse } from '$lib/rawg'
  import GameCard from './game-card.svelte'
  import { MediaQuery, SvelteSet } from 'svelte/reactivity'

  let { data }: { data: GamesListResponse[] } = $props()

  // let currentWidth = $state(0)

  const isLarge = new MediaQuery('(min-width: 1024px)')
  const isMedium = new MediaQuery('(min-width: 768px)')
  const isSmall = new MediaQuery('(min-width: 640px)')

  let currentColumnsCount: number = $derived.by(() => {
    if (isLarge.current) return 4
    if (isMedium.current) return 3
    if (isSmall.current) return 2
    return 1
  })

  function dedupeAndSplit(data: GamesListResponse[], columnsCounter: number): Game[][] {
    let games: Game[][] = Array.from({ length: columnsCounter }, () => [])
    let seen = new SvelteSet<string>()

    let index = 0

    for (let page of data) {
      for (let game of page.results) {
        if (seen.has(game.slug)) continue
        seen.add(game.slug)
        games[index % columnsCounter].push(game)
        index++
      }
    }

    return games
  }

  let games = $derived(dedupeAndSplit(data, currentColumnsCount))
</script>

<div class="col-span-full flex min-h-20 w-full items-center justify-center py-4">
  <div class="flex gap-6">
    {#each games as columns, columnsIdx (columnsIdx)}
      <div class="flex flex-1 flex-col gap-6">
        {#each columns as game, rowIdx (rowIdx)}
          <GameCard {game} />
        {/each}
      </div>
    {/each}
  </div>
</div>
