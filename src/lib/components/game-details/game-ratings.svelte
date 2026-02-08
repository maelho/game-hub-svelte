<script lang="ts">
  import type { Game } from '$lib/rawg/types'

  let { game }: { game: Game } = $props()
</script>

{#if game.rating !== undefined && game.rating > 0}
  <div class="border-industrial-border rounded-sm bg-industrial-secondary border p-4">
    <h3
      class="border-industrial-border-strong text-industrial-accent mb-4 border-b pb-2 text-[10px] font-medium tracking-wider uppercase"
    >
      User Ratings
    </h3>

    <div class="flex items-end justify-between">
      <div>
        <span class="mono-data text-industrial-text text-3xl font-medium"
          >{game.rating.toFixed(1)}</span
        >
        <span class="text-industrial-text-tertiary text-sm">/5</span>
      </div>
      {#if game.ratings_count}
        <span class="mono-data text-industrial-text-tertiary text-[10px]">
          {game.ratings_count.toLocaleString()} votes
        </span>
      {/if}
    </div>

    <div class="bg-industrial-tertiary rounded-sm mt-3 h-1 overflow-hidden">
      <div
        class="bg-industrial-accent h-full transition-all duration-500"
        style="width: {(game.rating / 5) * 100}%"
      ></div>
    </div>
  </div>
{/if}
