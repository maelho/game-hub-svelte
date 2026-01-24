<script lang="ts">
  // import type { Game, GamesListResponse } from '$lib/rawg'

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

  // function dedupeAndSplit(data: GamesListResponse[], columnsCounter: number) {
  //   let games: Game[][] = Array.from({ length: columnsCounter }, () => [])
  //   let seen = new Set<string>()
  // }
  //

  let columns = $derived(getColumns(299))
</script>

<h1>{columns}</h1>
