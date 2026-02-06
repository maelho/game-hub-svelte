<script lang="ts">
  import { Spinner } from '$lib/components/ui/spinner'

  let { message }: { message?: string } = $props()
</script>

<div class="flex min-h-64 flex-col items-center justify-center gap-4">
  <Spinner size="lg" />
  {#if message}
    <span class="text-[10px] text-industrial-text-tertiary uppercase tracking-wider">
      {message}
    </span>
  {/if}
</div>
