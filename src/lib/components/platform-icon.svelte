<script lang="ts">
  import type { PlataformNames } from '$lib/rawg'
  import * as Icons from './platform-icons'

  const platformIconLoaders: Record<PlataformNames, any> = {
    pc: Icons.Pc,
    playstation: Icons.Playstation,
    xbox: Icons.Xbox,
    ios: Icons.Ios,
    mac: Icons.Mac,
    linux: Icons.Linux,
    android: Icons.Android,
    nintendo: Icons.Nintendo,
    web: Icons.Web,

    // TODO: add missing Icons
    sega: Icons.Web,
    atari: Icons.Web,
    '3do': Icons.Web,
    'commodore-amiga': Icons.Web,
    'neo-geo': Icons.Web
  }

  let { slug }: { slug: PlataformNames } = $props()

  const Icon = $derived(platformIconLoaders[slug])
</script>

{#if Icon}
  <div class="flex items-center">
    <Icon />
  </div>
{/if}
