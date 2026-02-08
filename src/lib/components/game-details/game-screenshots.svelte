<script lang="ts">
  import emblaCarouselSvelte from 'embla-carousel-svelte'
  import { createQuery } from '@tanstack/svelte-query'
  import { IsInViewport } from 'runed'
  import { Spinner } from '$lib/components/ui/spinner'
  import { gameScreenshotsQueryOptions } from '$lib/queries/query-options'
  import { cn } from '$lib/utils/shadcn'
  import type { ScreenshotsListResponse } from '$lib/rawg/types'

  type EmblaApi = any

  let {
    slug,
    initialScreenshots
  }: {
    slug: string
    initialScreenshots?: Array<{ id: number; image: string }>
  } = $props()

  let sectionEl: HTMLElement | undefined = $state()

  const viewport = new IsInViewport(() => sectionEl, { rootMargin: '400px', once: true })

  let inView = $derived(viewport.current)

  const initialData = $derived.by((): ScreenshotsListResponse | undefined => {
    if (!initialScreenshots || initialScreenshots.length === 0) return undefined
    return {
      count: initialScreenshots.length,
      next: null,
      previous: null,
      results: initialScreenshots.map((s) => ({
        id: s.id,
        image: s.image,
        width: 0,
        height: 0
      }))
    }
  })

  const shouldFetch = $derived(inView && Boolean(slug?.trim()))

  const screenshotsQuery = createQuery(() => ({
    ...gameScreenshotsQueryOptions(slug),
    enabled: shouldFetch,
    initialData
  }))

  let screenshots = $derived(screenshotsQuery.data)
  let isFetched = $derived(screenshotsQuery.isFetched)

  let mainApi: EmblaApi | undefined = $state()
  let thumbApi: EmblaApi | undefined = $state()
  let current = $state(0)

  function onMainInit(event: CustomEvent<EmblaApi>) {
    mainApi = event.detail
  }

  function onThumbInit(event: CustomEvent<EmblaApi>) {
    thumbApi = event.detail
  }

  $effect(() => {
    if (!mainApi) return

    const handleSelect = () => {
      current = mainApi!.selectedScrollSnap()
      thumbApi?.scrollTo(current)
    }

    handleSelect()

    mainApi.on('select', handleSelect)
    mainApi.on('reInit', handleSelect)

    return () => {
      mainApi?.off('select', handleSelect)
      mainApi?.off('reInit', handleSelect)
    }
  })

  function handleThumbClick(index: number) {
    mainApi?.scrollTo(index)
  }

  let loadedImages = $state(new Set<number>())

  function markLoaded(id: number) {
    loadedImages = new Set([...loadedImages, id])
  }
</script>

{#if !screenshots}
  <section class="flex min-h-48 items-center justify-center" bind:this={sectionEl}>
    <Spinner size="md" />
  </section>
{:else if !inView && initialScreenshots && initialScreenshots.length > 0}
  <section class="space-y-3" bind:this={sectionEl}>
    <div class="mb-2 flex items-center justify-between">
      <span class="text-industrial-text-tertiary text-[10px] font-medium tracking-wider uppercase"
        >Screenshots</span
      >
      <span class="mono-data text-industrial-text-tertiary text-[10px]"
        >1 / {initialScreenshots.length}</span
      >
    </div>
    <div class="bg-industrial-tertiary relative aspect-video w-full overflow-hidden">
      <img
        alt="{slug} screenshot"
        class="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        src={initialScreenshots[0]?.image}
      />
    </div>
  </section>
{:else if isFetched && screenshots.results.length === 0}
  <!-- render nothing -->
{:else}
  <section class="space-y-3" bind:this={sectionEl}>
    <div class="mb-2 flex items-center justify-between">
      <span class="text-industrial-text-tertiary text-[10px] font-medium tracking-wider uppercase"
        >Screenshots</span
      >
      <span class="mono-data text-industrial-text-tertiary text-[10px]">
        {current + 1} / {screenshots.results.length}
      </span>
    </div>

    <div
      class="group w-full overflow-hidden"
      use:emblaCarouselSvelte={{ options: {}, plugins: [] }}
      onemblaInit={onMainInit}
    >
      <div class="flex">
        {#each screenshots.results as screenshot (screenshot.id)}
          <div class="min-w-0 flex-[0_0_100%]">
            <div
              class={cn(
                'border-industrial-border bg-industrial-tertiary relative aspect-video w-full overflow-hidden rounded-sm border'
              )}
            >
              <div
                class={cn(
                  'absolute inset-0 flex items-center justify-center transition-opacity duration-200',
                  loadedImages.has(screenshot.id) ? 'pointer-events-none opacity-0' : 'opacity-100'
                )}
              >
                <Spinner size="sm" />
              </div>
              <img
                alt="{slug} screenshot"
                class={cn(
                  'absolute inset-0 h-full w-full object-cover transition-opacity duration-200',
                  loadedImages.has(screenshot.id) ? 'opacity-100' : 'opacity-0'
                )}
                loading="lazy"
                onload={() => markLoaded(screenshot.id)}
                onerror={() => markLoaded(screenshot.id)}
                src={screenshot.image}
              />
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div
      class="w-full overflow-hidden"
      use:emblaCarouselSvelte={{
        options: { dragFree: true, containScroll: 'trimSnaps' },
        plugins: []
      }}
      onemblaInit={onThumbInit}
    >
      <div class="flex gap-1.5 sm:gap-2">
        {#each screenshots.results as screenshot, index (screenshot.id)}
          <button
            aria-label="Show screenshot {index + 1}"
            aria-pressed={index === current}
            class={cn(
              'block rounded-sm min-w-0 flex-[0_0_25%] overflow-hidden border transition-all duration-150 sm:flex-[0_0_20%] md:flex-[0_0_16.66%] lg:flex-[0_0_14.28%]',
              index === current
                ? 'border-industrial-accent opacity-100'
                : 'border-industrial-border hover:border-industrial-border-strong opacity-60 hover:opacity-100'
            )}
            onclick={() => handleThumbClick(index)}
            type="button"
          >
            <div class="bg-industrial-tertiary relative aspect-video w-full overflow-hidden">
              <div
                class={cn(
                  'absolute inset-0 flex items-center justify-center transition-opacity duration-200',
                  loadedImages.has(screenshot.id) ? 'pointer-events-none opacity-0' : 'opacity-100'
                )}
              >
                <Spinner size="sm" />
              </div>
              <img
                alt="{slug} thumbnail {index + 1}"
                class={cn(
                  'absolute inset-0 h-full w-full object-cover transition-opacity duration-200',
                  loadedImages.has(screenshot.id) ? 'opacity-100' : 'opacity-0'
                )}
                loading="lazy"
                onload={() => markLoaded(screenshot.id)}
                onerror={() => markLoaded(screenshot.id)}
                src={screenshot.image}
              />
            </div>
          </button>
        {/each}
      </div>
    </div>
  </section>
{/if}
