<script lang="ts">
  import { GameFilters } from '$lib/components/filters'
  import { X } from '@lucide/svelte'
  import { GamesInfiniteScroll } from '$lib/components/game-list'
  import { useGameFilters } from '$lib/hooks/useGameFilters.svelte'

  let filters = useGameFilters()
</script>

<div class="container mx-auto px-6 py-6">
  {#if filters.search}
    <div class="mb-6">
      <div class="flex items-center gap-3">
        <h1 class="text-industrial-text text-sm">
          <span class="text-industrial-text-tertiary">SEARCH:</span>{' '}
          <span class="text-industrial-accent">"{filters.search}"</span>
        </h1>
        <a href="/">
          <button
            class="border-industrial-border text-industrial-text-secondary hover:border-industrial-accent hover:text-industrial-accent flex items-center gap-1 rounded-sm border px-2 py-1 text-xs transition-all duration-150"
            type="button"
          >
            <X class="size-3" />
            clear
          </button>
        </a>
      </div>
    </div>
  {/if}

  <GameFilters {filters} />
  <GamesInfiniteScroll {filters} />
</div>
