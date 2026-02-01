<script lang="ts">
  import type { Game, GamesListResponse } from '$lib/rawg'
  import GameCard from './game-card.svelte'
  import { MediaQuery, SvelteSet } from 'svelte/reactivity'

  let { data }: { data: GamesListResponse[] } = $props()
  let currentWidth = $state(0)

  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024
  } as const

  function getColumns(width: number): number {
    if (width >= breakpoints.lg) return 4
    if (width >= breakpoints.md) return 3
    if (width >= breakpoints.sm) return 2
    return 1
  }

  let currentColumnsCount: number = $derived(getColumns(currentWidth))

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

<div bind:clientWidth={currentWidth} class="flex gap-6">
  {#each gameGrid as columns, columnsIdx (columnsIdx)}
    <div class="flex flex-1 flex-col gap-6">
      {#each columns as game, rowIdx (rowIdx)}
        <GameCard {game} />
      {/each}
    </div>
  {/each}
</div>
