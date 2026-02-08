<script lang="ts">
  import ExternalLink from '@lucide/svelte/icons/external-link'

  let { label, value, href }: { label: string; value: string | null | undefined; href?: string } =
    $props()
</script>

{#if value}
  <div
    class="border-industrial-border flex items-baseline justify-between gap-4 border-b border-dotted py-2 last:border-b-0"
  >
    <span
      class="text-industrial-text-tertiary shrink-0 text-[10px] font-medium tracking-wider uppercase"
    >
      {label}
    </span>
    <span class="mono-data text-industrial-text text-right text-xs">
      {#if href}
        <a
          class="text-industrial-accent inline-flex items-center gap-1 transition-colors hover:underline"
          {href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {value}
          <ExternalLink class="size-3" />
        </a>
      {:else}
        {value}
      {/if}
    </span>
  </div>
{/if}
