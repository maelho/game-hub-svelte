<script lang="ts">
  import { cn } from '$lib/utils/shadcn'

  let { score = 0 }: { score: number } = $props()

  let getScoreColor: string = $derived.by(() => {
    if (score >= 75) return 'text-industrial-success'
    if (score >= 50) return 'text-industrial-warning'
    return 'text-industrial-error'
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

<div
  class={cn(
    'mono-data absolute top-2 right-2 border rounded-sm border-current bg-industrial-primary/90 px-2 py-1 font-medium text-xs backdrop-blur-sm',
    getScoreColor
  )}
>
  {score}
</div>
