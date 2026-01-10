<script lang="ts">
  import './layout.css'
  import favicon from '$lib/assets/favicon.svg'
  import { browser } from '$app/environment'

  import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query'
  import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools'

  const { children } = $props()

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser
      }
    }
  })
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={queryClient}>
  {@render children()}
  <SvelteQueryDevtools />
</QueryClientProvider>
