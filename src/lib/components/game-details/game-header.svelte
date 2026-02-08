<script lang="ts">
  import ArrowLeft from '@lucide/svelte/icons/arrow-left'
  import MetacriticScore from '$lib/components/metacritic-score.svelte'
  import type { Game } from '$lib/rawg/types'

  let { game }: { game: Game } = $props()
</script>

<a
  class="text-industrial-text-secondary hover:text-industrial-accent mb-6 inline-flex items-center gap-2 text-xs transition-colors"
  href="/"
>
  <ArrowLeft class="size-3" />
  <span class="tracking-wider uppercase">Back</span>
</a>

<header class="border-industrial-border-strong mb-8 border-b pb-4">
  <div class="flex flex-wrap items-start justify-between gap-4">
    <div class="space-y-2">
      <h1 class="text-industrial-text text-xl leading-tight font-medium sm:text-2xl">
        {game.name}
      </h1>
      {#if game.alternative_names && game.alternative_names.length > 0}
        <p class="text-industrial-text-tertiary text-xs">
          aka {game.alternative_names.slice(0, 2).join(', ')}
        </p>
      {/if}
    </div>

    {#if game.metacritic}
      <div class="flex items-center gap-2">
        <span class="text-industrial-text-tertiary text-[10px] tracking-wider uppercase"
          >Metacritic</span
        >
        <MetacriticScore score={game.metacritic} />
      </div>
    {/if}
  </div>
</header>
