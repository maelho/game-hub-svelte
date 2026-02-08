<script lang="ts">
  import ExternalLink from '@lucide/svelte/icons/external-link'
  import type { Game } from '$lib/rawg/types'

  let { game }: { game: Game } = $props()
</script>

<div
  class="border-industrial-border bg-industrial-secondary border p-4"
  style="border-radius: var(--radius-sm)"
>
  <h3
    class="border-industrial-border-strong text-industrial-accent mb-4 border-b pb-2 text-[10px] font-medium tracking-wider uppercase"
  >
    External
  </h3>

  <div class="space-y-2">
    {#if game.website}
      <a
        class="border-industrial-border text-industrial-text-secondary hover:text-industrial-accent flex items-center justify-between border-b border-dotted py-2 text-xs transition-colors last:border-b-0"
        href={game.website}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span>Official Website</span>
        <ExternalLink class="size-3" />
      </a>
    {/if}
    <a
      class="text-industrial-text-secondary hover:text-industrial-accent flex items-center justify-between py-2 text-xs transition-colors"
      href="https://rawg.io/games/{game.slug}"
      rel="noopener noreferrer"
      target="_blank"
    >
      <span>RAWG Database</span>
      <ExternalLink class="size-3" />
    </a>
  </div>
</div>
