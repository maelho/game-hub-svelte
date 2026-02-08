<script lang="ts">
  import './layout.css'
  import favicon from '$lib/assets/favicon.svg'

  import { QueryClientProvider } from '@tanstack/svelte-query'
  import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools'
  import { getQueryClient } from '$lib/queries/query-client'
  import Navbar from '$lib/components/navbar.svelte'
  import Footer from '$lib/components/footer.svelte'

  const { children } = $props()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<QueryClientProvider client={getQueryClient()}>
  <div class="flex min-h-screen flex-col">
    <Navbar />
    <main class="flex-1">
      {@render children()}
    </main>
    <Footer />
  </div>
  <SvelteQueryDevtools />
</QueryClientProvider>
