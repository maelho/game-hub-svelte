<script lang="ts">
  import type { Game } from '$lib/rawg'
  import { getCroppedImageUrl } from '$lib/rawg/utils'
  import { formatPlatforms } from '$lib/utils/platform'
  import MetacriticScore from '$lib/components/metacritic-score.svelte'

  let { game }: { game: Game } = $props()
  const imgSrc = $derived(getCroppedImageUrl(game.background_image))

  let platformCodes = $derived(formatPlatforms(game.parent_platforms, 'short', ' · ', 4))
</script>

<a class="group block" href="/games/{game.slug}">
  <article
    class="border-industrial-border bg-industrial-secondary hover:border-industrial-accent/50 hover:bg-industrial-tertiary overflow-hidden rounded-sm border transition-all duration-150"
  >
    <div class="bg-industrial-tertiary relative aspect-video overflow-hidden">
      {#if imgSrc}
        <img
          alt={game.name}
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={imgSrc}
        />
      {:else}
        <div
          class="text-industrial-text-tertiary flex h-full w-full items-center justify-center text-xs"
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
        class="text-industrial-text group-hover:text-industrial-accent line-clamp-2 text-sm leading-tight font-medium transition-colors duration-150"
      >
        {game.name}
      </h3>

      <div
        class="border-industrial-border-strong flex items-center justify-between gap-2 border-t border-dotted pt-1"
      >
        {#if platformCodes}
          <span class="text-industrial-text-tertiary text-[10px] tracking-wide">
            {platformCodes}
          </span>
        {/if}

        {#if game.rating && game.rating > 0}
          <span class="mono-data text-industrial-text-secondary text-[10px]">
            {game.rating.toFixed(1)}/5
          </span>
        {/if}
      </div>
    </div>
  </article>
</a>
