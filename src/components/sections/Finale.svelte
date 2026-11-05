<script>
  import { reveal, tilt } from '../../lib/actions';

  const paths = [
    { tag: 'start', h: 'Start', p: 'Copy a starter flake into your own config and build from there.', href: 'https://github.com/finix-community/examples' },
    { tag: 'go further', h: 'Go further', p: 'Browse community-modules for things outside the core.', href: 'https://github.com/finix-community/community-modules' },
    { tag: 'get help', h: 'Get help', p: 'Ask on Discord, or open an issue on GitHub.', href: 'https://discord.gg/nVe5Zkaypg' },
  ];
</script>

<section class="fin" aria-labelledby="fin-h">
  <h2 id="fin-h" class="rv" use:reveal><span class="hl hl-pink">Still curious?</span></h2>
  <p class="fin-sub rv" use:reveal>Three ways to go, in no particular order. Each one is optional.</p>
  <ol class="fin-steps">
    {#each paths as p, i (p.h)}
      <li class="rv" use:reveal style:--i={i}>
        <a href={p.href} use:tilt={4}>
          <span class="fin-time">{p.tag}</span>
          <h3>{p.h}</h3>
          <p>{p.p}</p>
        </a>
      </li>
    {/each}
  </ol>
</section>
