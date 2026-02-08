<script lang="ts">
  import ExternalLink from '@lucide/svelte/icons/external-link'
</script>

<footer class="border-industrial-border bg-industrial-primary mt-auto border-t py-6">
  <div
    class="container mx-auto flex flex-col items-center justify-center gap-3 px-4 text-center sm:px-6"
  >
    <div class="flex items-center gap-2">
      <span class="text-industrial-text-tertiary text-[10px] tracking-wider uppercase"
        >Data source:</span
      >
      <a
        class="text-industrial-text-secondary hover:text-industrial-accent inline-flex items-center gap-1.5 text-xs transition-colors"
        href="https://rawg.io"
        rel="noopener noreferrer"
        target="_blank"
      >
        RAWG.io
        <ExternalLink class="size-3" />
      </a>
    </div>
    <p class="mono-data text-industrial-text-tertiary text-[10px]">
      The largest open video game database
    </p>
  </div>
</footer>
