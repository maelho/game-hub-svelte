<script lang="ts">
  import type { GamesListResponse } from '$lib/rawg'

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

  // function dedupeAndSplit(data: GamesListResponse[], columnsCounter: number) {}
</script>

<h1 class="block bg-amber-400">Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
