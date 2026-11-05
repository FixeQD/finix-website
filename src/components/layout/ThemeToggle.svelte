<script>
  import { onMount, flushSync } from 'svelte';
  import { currentTheme, setTheme, followSystem } from '../../lib/theme';

  let theme = $state('light');
  let button = $state(null);
  let morph;

  onMount(() => {
    theme = currentTheme();
    return followSystem((next) => (theme = next));
  });

  function toggle() {
    flip();
    wash();
  }

  // The wash: colours change in a wave that pours from the toggle, the way ink soaks into paper.
  // Every element gets a hand-tuned delay (distance from the button, plus deliberate sloppiness)
  // and its own duration, so the front is irregular like a real wash instead of a clean wipe.
  const WAVE_VEL = 5;    // px of distance per ms of delay
  const LIFETIME = 1400; // farthest delay + the longest duration, with margin

  function wash() {
    const root = document.documentElement;
    const r = button?.getBoundingClientRect() ?? { left: innerWidth / 2, top: 40, width: 0, height: 0 };
    const ox = r.left + r.width / 2;
    const oy = r.top + r.height / 2;

    root.classList.add('theme-morph');
    for (const el of document.querySelectorAll('body, body *')) {
      const b = el.getBoundingClientRect();
      const jolt = Math.random() * 140 - 70; // sloppy hand, not a compass
      const delay = Math.max((Math.hypot(b.left + b.width / 2 - ox, b.top + b.height / 2 - oy) + jolt) / WAVE_VEL, Math.random() * 40);
      const dur = 0.36 + Math.random() * 0.16;
      el.style.setProperty('--morph-delay', `${delay.toFixed(0)}ms`);
      el.style.setProperty('--morph-dur', `${dur.toFixed(2)}s`);
    }
    void root.offsetWidth; // recalc the delays together with the armed class, before the token flips
    const next = theme === 'dark' ? 'light' : 'dark';
    flushSync(() => { theme = next; });
    setTheme(next);

    clearTimeout(morph);
    morph = setTimeout(() => {
      root.classList.remove('theme-morph');
      for (const el of document.querySelectorAll('[style*="--morph-"]')) {
        el.style.removeProperty('--morph-delay');
        el.style.removeProperty('--morph-dur');
      }
    }, LIFETIME);
  }

  // One-shot doodle spin on the icon, replayed from scratch every click.
  function flip() {
    const svg = button?.querySelector('svg');
    if (!svg) return;
    svg.classList.remove('flip');
    void svg.getBoundingClientRect(); // force a reflow so the class re-adds replays the animation
    svg.classList.add('flip');
  }
</script>

<button bind:this={button} class="theme-toggle" type="button" onclick={toggle} aria-label={theme === 'dark' ? 'Switch to the light theme' : 'Switch to the dark theme'}>
  <svg aria-hidden="true"><use href={theme === 'dark' ? '#i-sun' : '#i-moon'} /></svg>
</button>
