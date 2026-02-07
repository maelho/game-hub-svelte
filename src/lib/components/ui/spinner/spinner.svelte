<script lang="ts">
  import { cn } from '$lib/utils/shadcn'
  import type { HTMLAttributes } from 'svelte/elements'

  type Size = 'sm' | 'md' | 'lg'

  interface Props extends HTMLAttributes<HTMLDivElement> {
    label?: string
    size?: Size
  }
  const sizeClasses = {
    sm: 'size-1.5',
    md: 'size-2',
    lg: 'size-3'
  }

  const delays = ['0ms', '200ms', '400ms']

  let { class: className, size = 'md', label = 'Loading', ...restProps }: Props = $props()
</script>

<div
  class={cn('flex items-center justify-center gap-1', className)}
  aria-label={label}
  role="status"
  {...restProps}
>
  {#each delays as delay}
    <span
      class={cn('bg-industrial-accent animate-pulse', sizeClasses[size])}
      style:animation-delay={delay}
      style:animation-duration:="800ms"
    ></span>
  {/each}
  <span class="sr-only">{label}</span>
</div>
