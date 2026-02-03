<script lang="ts">
  import GameFilters from '$lib/components/game-filters.svelte'
  import GamesInfiniteScroll from '$lib/components/games-infinite-scroll.svelte'
  import { useGameFilters } from '$lib/hooks/useGameFilters.svelte'

  let filters = useGameFilters()
</script>

<div class="container mx-auto px-6 py-6">
  <GameFilters {filters} />
  <GamesInfiniteScroll {filters} />
</div>
