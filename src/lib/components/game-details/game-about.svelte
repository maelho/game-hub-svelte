<script lang="ts">
  import GameDescription from './game-description.svelte'

  let { description }: { description: string | null | undefined } = $props()
</script>

<section class="space-y-3">
  <h2
    class="border-industrial-border-strong text-industrial-text-tertiary border-b pb-2 text-xs font-medium tracking-wider uppercase"
  >
    Description
  </h2>
  <GameDescription {description} />
</section>
