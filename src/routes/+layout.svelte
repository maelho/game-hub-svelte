<script lang="ts">
  import './layout.css'
  import favicon from '$lib/assets/favicon.svg'

  import { QueryClientProvider } from '@tanstack/svelte-query'
  import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools'
  import { getQueryClient } from '$lib/query-client'

  const { children } = $props()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={getQueryClient()}>
  {@render children()}
  <SvelteQueryDevtools />
</QueryClientProvider>
