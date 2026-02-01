<script lang="ts">
  import type { Game, GamesListResponse } from '$lib/rawg'
  import GameCard from './game-card.svelte'
  import { MediaQuery, SvelteSet } from 'svelte/reactivity'

  let { data }: { data: GamesListResponse[] } = $props()

  const isLarge = new MediaQuery('(min-width: 1024px)')
  const isMedium = new MediaQuery('(min-width: 768px)')
  const isSmall = new MediaQuery('(min-width: 640px)')

  let currentColumnsCount: number = $derived.by(() => {
    if (isLarge.current) return 4
    if (isMedium.current) return 3
    if (isSmall.current) return 2
    return 1
  })

  let allGames = $derived.by(() => {
    let seen = new SvelteSet<string>()
    let games: Game[] = []
    for (let page of data) {
      for (let game of page.results) {
        if (seen.has(game.slug)) continue
        seen.add(game.slug)
        games.push(game)
      }
    }

    return games
  })

  let gameGrid = $derived.by(() => {
    let grid: Game[][] = Array.from({ length: currentColumnsCount }, () => [])

    allGames.forEach((game, index) => {
      grid[index % currentColumnsCount].push(game)
    })

    return grid
  })
</script>

<div class="flex gap-6">
  {#each gameGrid as columns, columnsIdx (columnsIdx)}
    <div class="flex flex-1 flex-col gap-6">
      {#each columns as game, rowIdx (rowIdx)}
        <GameCard {game} />
      {/each}
    </div>
  {/each}
</div>
