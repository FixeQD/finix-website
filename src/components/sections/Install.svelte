<script>
  import { onMount } from 'svelte';
  import { reveal } from '../../lib/actions';
  import { downloads } from '../../lib/content/downloads';
  import CodeBlock from '../ui/CodeBlock.svelte';

  // The ISO path. finix installs from a NixOS live ISO; the flake is the source of the config (path one).
  const items = [
    { t: 'Find out what finix is', d: 'You are here, and you can stop here too. Nothing below is required to look around.', locked: true },
    { t: 'Get a NixOS ISO', d: 'Finix has no image of its own yet. The graphical or the minimal NixOS image both work.' },
    { t: 'Flash it to a USB stick', d: 'Any flashing tool works. It erases the disk you point it at. The commands sit on the right.', code: 'dd' },
    { t: 'Boot it and get online', d: 'You need internet, 2 GB of RAM and 32 GB of disk at minimum. Use a separate root partition if you convert a NixOS install.' },
    { t: 'Install finix', d: 'Follow the manual steps in the guide, or try the experimental Calamares installer. From a live system it is ', code: 'nixos-install --root /mnt --flake /path#finixos' },
    { t: 'Reboot and rebuild', d: 'Your config lives in its own flake from here on. Rebuild, then import modules as you need them.' },
  ];

  const INSTALL_KEY = 'finix-install';
  let done = $state([0]);
  let total = items.length;

  onMount(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(INSTALL_KEY) ?? '[]');
      if (Array.isArray(saved)) done = [...new Set([0, ...saved.filter((n) => Number.isInteger(n) && n > 0 && n < total)])];
    } catch {} // storage can be blocked
  });

  function toggle(i) {
    if (items[i].locked) return;
    done = done.includes(i) ? done.filter((x) => x !== i) : [...done, i];
    try { localStorage.setItem(INSTALL_KEY, JSON.stringify(done)); } catch {}
  }
</script>

<section class="readme inst" id="download" aria-labelledby="inst-h">
  <h2 id="inst-h" class="rv" use:reveal>Install <span class="hl hl-yellow">finix</span></h2>
  <div class="inst-meter rv" use:reveal style:--p={done.length / total}>
    <span aria-hidden="true"></span>
    <p aria-live="polite">
      {#if done.length === total}
        All done. Welcome aboard.
      {:else}
        {#key done.length}<b class="inst-num">{done.length}</b>{/key} of {total} done · tick them off as you go, this browser remembers
      {/if}
    </p>
  </div>

  <!-- Path one: the flake. Flakes are the generally recommended pinning method (installation.md). -->
  <article class="inst-path on-paper rv" use:reveal>
    <span class="inst-badge">recommended</span>
    <h3>Start from a flake</h3>
    <p>The examples repository has starter flakes you instantiate locally, then point <code>nixos-install</code> at:</p>
    <div>
      <CodeBlock lang="sh" title="Minimal, or graphical" code={`nix flake init -t github:finix-community/examples#installation-minimal
# or the graphical one (labwc + tuigreet):
nix flake init -t github:finix-community/examples#installation-graphical`} />
    </div>
  </article>

  <!-- Path two: NixOS ISO, the manual route -->
  <article class="inst-path on-paper rv" use:reveal>
    <h3>Install from a NixOS ISO</h3>
    <p>The current finix has no image of its own, so the config source comes from a live NixOS environment:</p>
    <div class="inst-grid">
      <ol class="check">
        {#each items as it, i (it.t)}
          <li class="rv" class:done={done.includes(i)} use:reveal style:--i={i}>
            <button type="button" class="box" role="checkbox" aria-checked={done.includes(i)} aria-label={it.t} disabled={it.locked} onclick={() => toggle(i)}></button>
            <div><b>{it.t}</b><p>{it.d}{#if it.code}<code>{it.code}</code>{/if}</p></div>
          </li>
        {/each}
      </ol>
      <div class="inst-code">
        <CodeBlock lang="text" title="Flash the ISO" code="sudo dd if=/path/to/installer.iso of=/dev/sdX bs=4M status=progress" />
        <CodeBlock title="Optional: the binary cache" code={`services.nix-daemon.settings = {
  substituters = [ "https://finix.cachix.org" ];
  trusted-public-keys = [ "finix.cachix.org-1:0ejikHDeCp0UErsduUUHcg9IJczY2/h2e5132Z/As/c=" ];
};`} />
      </div>
    </div>
  </article>

  <ul class="routes">
    {#each downloads as d (d.id)}<li><a href={d.href}>{d.name}<small>{d.cta} ↗</small></a></li>{/each}
  </ul>
</section>
