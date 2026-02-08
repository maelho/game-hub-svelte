<script lang="ts">
  import { page } from '$app/state'
  import { createQuery } from '@tanstack/svelte-query'
  import { GameAbout, GameHeader, GameScreenshots, GameSidebar } from '$lib/components/game-details'
  import { Spinner } from '$lib/components/ui/spinner'
  import { gameDetailsQueryOptions } from '$lib/queries/query-options'

  const slug = $derived(page.params.slug)

  const gameQuery = createQuery(() => gameDetailsQueryOptions(slug as string))

  let game = $derived(gameQuery.data)
</script>

<svelte:head>
  {#if game}
    <title>{game.name} - Game Hub</title>
  {/if}
</svelte:head>

{#if gameQuery.isLoading}
  <div class="flex min-h-96 items-center justify-center">
    <Spinner size="md" />
  </div>
{:else if gameQuery.isError}
  <div class="flex min-h-96 items-center justify-center">
    <p class="text-industrial-text-tertiary text-sm">Failed to load game details.</p>
  </div>
{:else if game}
  <div class="container mx-auto px-4 py-6 sm:px-6">
    <GameHeader {game} />

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
      <div class="space-y-8 lg:col-span-2">
        <GameScreenshots initialScreenshots={game.short_screenshots} slug={game.slug} />
        <GameAbout description={game.description} />
      </div>

      <aside class="lg:col-span-1">
        <GameSidebar {game} />
      </aside>
    </div>
  </div>
{/if}
