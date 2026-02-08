<script lang="ts">
  import type { Game } from '$lib/rawg/types'
  import GameSpecifications from './game-specifications.svelte'
  import GameRatings from './game-ratings.svelte'
  import GameExternalLinks from './game-external-links.svelte'

  let { game }: { game: Game } = $props()
</script>

<div class="space-y-6 lg:sticky lg:top-20">
  <GameSpecifications {game} />
  <GameRatings {game} />
  <GameExternalLinks {game} />
</div>
