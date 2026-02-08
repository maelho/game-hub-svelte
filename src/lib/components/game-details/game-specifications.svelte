<script lang="ts">
  import { formatPlatforms } from '$lib/utils/platform'
  import type { Game } from '$lib/rawg/types'
  import SpecRow from './spec-row.svelte'

  let { game }: { game: Game } = $props()

  let formattedDate = $derived(
    game.released
      ? new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }).format(new Date(game.released))
      : null
  )

  let platforms = $derived(formatPlatforms(game.parent_platforms, 'full'))
  let genres = $derived(game.genres?.map((g) => g.name).join(' / '))
  let developers = $derived(game.developers?.map((d) => d.name).join(', '))
  let publishers = $derived(game.publishers?.map((p) => p.name).join(', '))
</script>

<div
  class="border-industrial-border bg-industrial-secondary border p-4"
  style="border-radius: var(--radius-sm)"
>
  <h3
    class="border-industrial-border-strong text-industrial-accent mb-4 border-b pb-2 text-[10px] font-medium tracking-wider uppercase"
  >
    Specifications
  </h3>

  <div class="space-y-0">
    <SpecRow label="Release" value={formattedDate} />
    <SpecRow label="Platforms" value={platforms} />
    <SpecRow label="Genres" value={genres} />
    <SpecRow label="Developers" value={developers} />
    <SpecRow label="Publishers" value={publishers} />
    {#if game.playtime !== undefined && game.playtime > 0}
      <SpecRow label="Playtime" value={`${game.playtime} hrs avg`} />
    {/if}
    {#if game.esrb_rating}
      <SpecRow label="Age Rating" value={game.esrb_rating.name} />
    {/if}
  </div>
</div>
