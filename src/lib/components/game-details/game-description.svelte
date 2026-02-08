<script lang="ts">
  let { description }: { description: string | null | undefined } = $props()
</script>

{#if !description}
  <p class="text-industrial-text-tertiary text-sm">No description available.</p>
{:else}
  <div class="prose-industrial">
    {@html description}
  </div>
{/if}
