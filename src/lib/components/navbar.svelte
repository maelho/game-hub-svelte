<script lang="ts">
  import { goto } from '$app/navigation'
  import { page } from '$app/state'
  import { Search } from '@lucide/svelte'
  import { onMount } from 'svelte'

  let searchValue = $state('')
  let isFocused = $state(false)
  let inputRef = $state<HTMLInputElement>()

  $effect(() => {
    searchValue = page.url.searchParams.get('search') ?? ''
  })

  onMount(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (isEditableElement(document.activeElement)) return

      if (e.key === '/') {
        e.preventDefault()
        inputRef?.focus()
      }
    }

    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  })

  function isEditableElement(el: Element | null): boolean {
    return (
      el instanceof HTMLInputElement ||
      el instanceof HTMLTextAreaElement ||
      el?.getAttribute('contenteditable') === 'true'
    )
  }

  function navigateToSearch(query: string) {
    const trimmed = query.trim()
    goto(trimmed ? `/?search=${encodeURIComponent(trimmed)}` : '/')
  }

  function handleLogoClick(e: MouseEvent) {
    if (e.metaKey || e.ctrlKey) return

    e.preventDefault()
    searchValue = ''
    goto('/')
  }

  function handleSearch(e: SubmitEvent) {
    e.preventDefault()
    inputRef?.blur()
    navigateToSearch(searchValue)
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      searchValue = ''
      inputRef?.blur()
    }
  }

  function handleClear(e: MouseEvent) {
    e.preventDefault()
    searchValue = ''
    inputRef?.focus()
  }
</script>

<header
  class="sticky top-0 z-50 w-full border-industrial-border border-b bg-industrial-primary/95 backdrop-blur-sm"
>
  <div class="container mx-auto flex h-14 items-center gap-6 px-4 sm:px-6">
    <a
      href="/"
      class="group flex shrink-0 items-center gap-2 transition-colors duration-150"
      onclick={handleLogoClick}
    >
      <span class="font-medium text-industrial-accent">[</span>
      <span
        class="text-industrial-text text-sm tracking-wide transition-colors duration-150 group-hover:text-industrial-accent"
      >
        GAME_HUB
      </span>
      <span class="font-medium text-industrial-accent">]</span>
    </a>

    <div class="flex-1"></div>

    <form
      class="w-full max-w-xs sm:max-w-sm"
      onsubmit={handleSearch}
      role="search"
      aria-label="Search games"
    >
      <div
        class="flex h-9 items-center gap-2 border px-3 transition-all duration-150
          {isFocused
          ? 'border-industrial-accent bg-industrial-secondary'
          : 'border-industrial-border bg-industrial-secondary/50 hover:border-industrial-border-strong'}"
        style="border-radius: var(--radius-sm)"
      >
        <Search
          class="size-3.5 shrink-0 transition-colors duration-150
            {isFocused ? 'text-industrial-accent' : 'text-industrial-text-tertiary'}"
          aria-hidden="true"
        />

        <input
          bind:this={inputRef}
          type="search"
          bind:value={searchValue}
          placeholder="Search..."
          aria-label="Search"
          autocomplete="off"
          spellcheck="false"
          class="w-full flex-1 appearance-none bg-transparent text-industrial-text text-sm
            placeholder:text-industrial-text-tertiary focus:outline-none
            [&::-webkit-search-cancel-button]:hidden
            [&::-webkit-search-decoration]:hidden"
          onfocus={() => (isFocused = true)}
          onblur={() => (isFocused = false)}
          onkeydown={handleKeyDown}
        />

        {#if searchValue && isFocused}
          <button
            type="button"
            class="shrink-0 text-industrial-text-tertiary transition-colors duration-150
              hover:text-industrial-text"
            onmousedown={handleClear}
            aria-label="Clear search"
          >
            <svg
              class="size-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        {:else}
          <kbd
            class="hidden shrink-0 rounded-sm border border-industrial-border bg-industrial-tertiary
              px-1.5 py-0.5 text-[10px] text-industrial-text-tertiary sm:inline-flex"
            aria-hidden="true"
          >
            /
          </kbd>
        {/if}
      </div>
    </form>
  </div>
</header>
