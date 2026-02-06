<script lang="ts">
  import type { Game } from '$lib/rawg'
  import { getCroppedImageUrl } from '$lib/rawg/utils'
  import { formatPlatforms } from '$lib/utils/platform'
  import MetacriticScore from '$lib/components/metacritic-score.svelte'

  let { game }: { game: Game } = $props()
  const imgSrc = $derived(getCroppedImageUrl(game.background_image))

  let platformCodes = $derived(formatPlatforms(game.parent_platforms, 'short', ' · ', 4))
</script>

<a class="group block" href="/">
  <article
    class="overflow-hidden rounded-sm border border-industrial-border bg-industrial-secondary transition-all duration-150 hover:border-industrial-accent/50 hover:bg-industrial-tertiary"
  >
    <div class="relative aspect-video overflow-hidden bg-industrial-tertiary">
      {#if imgSrc}
        <img
          alt={game.name}
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={imgSrc}
        />
      {:else}
        <div
          class="flex h-full w-full items-center justify-center text-industrial-text-tertiary text-xs"
        >
          NO_IMAGE
        </div>
      {/if}
      {#if game.metacritic}
        <MetacriticScore score={game.metacritic} />
      {/if}
    </div>

    <div class="space-y-2 p-3">
      <h3
        class="line-clamp-2 font-medium text-industrial-text text-sm leading-tight transition-colors duration-150 group-hover:text-industrial-accent"
      >
        {game.name}
      </h3>

      <div
        class="flex items-center justify-between gap-2 border-industrial-border-strong border-t border-dotted pt-1"
      >
        {#if platformCodes}
          <span class="text-[10px] text-industrial-text-tertiary tracking-wide">
            {platformCodes}
          </span>
        {/if}

        {#if game.rating && game.rating > 0}
          <span class="mono-data text-[10px] text-industrial-text-secondary">
            {game.rating.toFixed(1)}/5
          </span>
        {/if}
      </div>
    </div>
  </article>
</a>
