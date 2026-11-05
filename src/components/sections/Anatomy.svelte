<script>
  import { onMount } from 'svelte';
  import Chapter from '../ui/Chapter.svelte';
  import { hlNix } from '../../lib/highlight';

  const lines = [
    { t: '{', g: 0 },
    { t: '  modules, # like NixOS modulesPath', g: 0 },
    { t: '  config,', g: 0 },
    { t: '  ...', g: 0 },
    { t: '}:', g: 0 },
    { t: '{', g: null },
    { t: '  imports = [ modules.chrony ];', g: 1 },
    { t: '', g: null },
    { t: '  services.chrony.enable = true;', g: 2 },
    { t: '}', g: null },
  ];
  const notes = [
    { h: 'Your config is a function', p: 'The system calls it with the arguments listed here. modules holds the repo modules by their real names, the finix equivalent of NixOS modulesPath.' },
    { h: 'Opting in', p: 'Only modules.chrony is loaded, and only because you imported it. Everything that stays out of the list never reaches your system.' },
    { h: 'Then an ordinary option', p: 'services.chrony.enable is a named option you can look up in the manual. Swap chrony for another module and the shape of the file does not change.' },
  ];
  const text = lines.map((l) => l.t).join('\n');

  let cur = $state(1);
  let touched = $state(false);
  let copied = $state(false);

  function pick(g) { if (g === null) return; touched = true; cur = g; }
  async function copy() {
    try { await navigator.clipboard.writeText(text); copied = true; setTimeout(() => (copied = false), 1500); } catch {}
  }

  // Walk through the groups until the visitor takes over.
  onMount(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => { if (!touched) cur = (cur + 1) % notes.length; }, 3400);
    return () => clearInterval(timer);
  });
</script>

<Chapter id="config" kicker="$ cat module.nix" title="Importing a module" tone="yellow"
  intro="Hover or tap a line. The module appears only because the imports list says so.">
  <div class="an">
    <div class="an-code on-paper">
      <div class="an-head"><span>module.nix</span><button type="button" class="wb-chip" onclick={copy}>{copied ? 'copied!' : 'copy'}</button></div>
      <div class="an-lines">
        {#each lines as l, i (i)}
          {#if l.g === null}
            <span class="an-line plain">{@html hlNix(l.t || ' ')}</span>
          {:else}
            <button type="button" class="an-line" class:on={cur === l.g} onmouseenter={() => pick(l.g)} onfocus={() => pick(l.g)} onclick={() => pick(l.g)}>{@html hlNix(l.t)}</button>
          {/if}
        {/each}
      </div>
    </div>

    <aside class="an-note on-paper" aria-live="polite">
      <small>{cur + 1} / {notes.length}</small>
      <h3>{notes[cur].h}</h3>
      <p>{notes[cur].p}</p>
      <a class="an-cta" href="https://github.com/finix-community/examples">Starter flakes →</a>
    </aside>
  </div>
</Chapter>
