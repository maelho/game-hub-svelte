<script lang="ts">
  import { cn } from '$lib/utils/shadcn'

  let { score = 0 }: { score: number } = $props()

  let getScoreColor: string = $derived.by(() => {
    if (score >= 75) return 'bg-green-600 text-white'
    if (score >= 50) return 'bg-yellow-500 text-black'
    return 'bg-red-600 text-white'
  })
</script>

<span
  class={cn(
    'inline-flex h-6 w-7 items-center justify-center rounded font-bold text-sm',
    getScoreColor
  )}
>
  {score}
</span>
