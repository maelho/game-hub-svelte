<script lang="ts">
  import type { ParentPlatform } from '$lib/rawg'
  import PlatformIcon from './platform-icon.svelte'

  interface Props {
    limit?: number
    parent_platform: ParentPlatform[]
  }

  let { limit = 4, parent_platform }: Props = $props()

  const visiblePlatforms = $derived(parent_platform.slice(0, limit))
  const remainingCount = $derived(parent_platform.length - limit)
</script>

<div class="mb-4 flex items-center gap-2">
  {#each visiblePlatforms as parent (parent.platform.slug)}
    <PlatformIcon slug={parent.platform.slug} />
  {/each}
  {#if remainingCount > 0}
    <span class="text-muted-foreground/40 text-xs">+{remainingCount}</span>
  {/if}
</div>
