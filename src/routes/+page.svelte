<script lang="ts">
  import { GameFilters } from '$lib/components/filters'
  import { GamesInfiniteScroll } from '$lib/components/game-list'
  import { useGameFilters } from '$lib/hooks/useGameFilters.svelte'

  let filters = useGameFilters()
</script>

<div class="container mx-auto px-6 py-6">
  <GameFilters {filters} />
  <GamesInfiniteScroll {filters} />
</div>
