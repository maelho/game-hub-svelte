<script lang="ts">
  import * as Select from '$lib/components/ui/select'
  import type { GameFiltersReturn } from '$lib/hooks/useGameFilters.svelte'
  import { sortBy } from '$lib/rawg'
  import { Field, FieldLabel } from './ui/field'

  let { filters }: { filters: GameFiltersReturn } = $props()

  let sortValue = $state('')
  const sortBytriggerContent = $derived(
    sortBy.find((b) => b.value === sortValue)?.label ?? 'Relevance'
  )
</script>

<div class="mb-6 flex gap-6">
  <div class="min-w-min">
    <Field>
      <FieldLabel for="order-by">Order by</FieldLabel>
      <Select.Root type="single" bind:value={filters.ordering}>
        <Select.Trigger id="order-by">{sortBytriggerContent}</Select.Trigger>
        <Select.Content>
          <Select.Group>
            {#each sortBy as by (by.value)}
              <Select.Item label={by.label} value={by.value}>
                {by.label}
              </Select.Item>
            {/each}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </Field>
  </div>
</div>
