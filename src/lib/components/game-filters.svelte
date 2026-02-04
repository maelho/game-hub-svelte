<script lang="ts">
  import * as Select from '$lib/components/ui/select'
  import type { GameFiltersReturn } from '$lib/hooks/useGameFilters.svelte'
  import { sortBy } from '$lib/rawg'
  import { createQuery } from '@tanstack/svelte-query'
  import { Field, FieldLabel } from './ui/field'
  import { platformsQueryOptions } from '$lib/query-options'

  interface SelectOptions {
    htmlFor: string
    items: { value: string; label: string; disabled?: boolean }[]
    triggerContent: string
    value: string
    label: string
    onchange: (value: string) => void
  }

  let { filters }: { filters: GameFiltersReturn } = $props()

  const platformQuery = createQuery(platformsQueryOptions)

  let plataformItems = $derived(
    platformQuery.data?.results.map((p) => {
      return { label: p.name, value: String(p.id) }
    }) ?? []
  )

  let sortbyTriggerContent = $derived(
    sortBy.find((b) => b.value === filters.ordering)?.label ?? 'Relevance'
  )

  let platformTriggeContent = $derived(
    plataformItems.find((p) => p.value === filters.parent_platforms)?.label ?? 'All platforms'
  )
</script>

<div class="mb-6 flex gap-6">
  {@render filtersOptions({
    htmlFor: 'sort-by',
    label: 'Order by',
    value: filters.ordering,
    items: sortBy,
    triggerContent: sortbyTriggerContent,
    onchange: (v) => (filters.ordering = v)
  })}

  {#if platformQuery.isLoading}
    <span>loading...</span>
  {:else if platformQuery.isSuccess}
    {@render filtersOptions({
      htmlFor: 'sort-platform',
      label: 'All platforms',
      value: filters.parent_platforms,
      items: plataformItems,
      triggerContent: platformTriggeContent,
      onchange: (v) => (filters.parent_platforms = v)
    })}
  {/if}
</div>

{#snippet filtersOptions({ htmlFor, value, items, triggerContent, label, onchange }: SelectOptions)}
  <div class="min-w-min">
    <Field>
      <FieldLabel for={htmlFor}>{label}</FieldLabel>
      <Select.Root type="single" {value} onValueChange={onchange}>
        <Select.Trigger id={htmlFor}>{triggerContent}</Select.Trigger>
        <Select.Content>
          <Select.Group>
            {#each items as item (item.value)}
              <Select.Item label={item.label} value={item.value}>
                {item.label}
              </Select.Item>
            {/each}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Field>
  </div>
{/snippet}
