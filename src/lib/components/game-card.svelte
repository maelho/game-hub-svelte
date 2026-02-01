<script lang="ts">
  import Card from '$lib/components/ui/card/card.svelte'
  import type { Game } from '$lib/rawg'
  import { getCroppedImageUrl } from '$lib/rawg/utils'
  import MetacriticScore from './metacritic-score.svelte'
  import PlatformIconsList from './platform-icons-list.svelte'
  import CardContent from './ui/card/card-content.svelte'
  import CardFooter from './ui/card/card-footer.svelte'

  let { game }: { game: Game } = $props()
  const imgSrc = $derived(getCroppedImageUrl(game.background_image))
</script>

<a class="block" href="/">
  <Card
    class="gap-0 overflow-hidden pt-0 pb-0 transition-[outline] hover:outline-2 hover:outline-primary"
  >
    <CardContent class="px-0">
      {#if imgSrc}
        <img class="w-full object-cover" alt={game.name} src={imgSrc} />
      {/if}
    </CardContent>
    <CardFooter class="flex flex-col items-start p-4">
      <div class="flex w-full items-center justify-between gap-3">
        <PlatformIconsList parent_platform={game.parent_platforms} />
        {#if game.metacritic}
          <MetacriticScore score={game.metacritic} />
        {/if}
      </div>
      <h3 class="text-left font-bold text-2xl">{game.name}</h3>
    </CardFooter>
  </Card>
</a>
