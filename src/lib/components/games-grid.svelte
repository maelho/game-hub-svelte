<script lang="ts">
  import type { Game, GamesListResponse } from '$lib/rawg'

  interface Props {
    data: GamesListResponse
  }

  let { data }: Props = $props()

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

  function dedupeAndSplit(data: GamesListResponse[], columnsCounter: number) {
    let games: Game[][] = Array.from({ length: columnsCounter }, () => [])
    let seen = new Set<string>()

    let index = 0

    for (let page of data) {
      for (let game of page.results) {
        if (seen.has(game.slug)) continue
        games[index % columnsCounter].push(game)
        index++
      }
    }
  }

  // console.log(dedupeAndSplit(games, 4))

  let columns = $derived(getColumns(299))
</script>

<h1>{columns}</h1>
<pre>{JSON.stringify(data, null, 2)}</pre>
