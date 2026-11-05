<script>
  import { reveal, tilt } from '../../lib/actions';

  // One reveal card. The parent only counts toggles, so the counter swap machine stays out of here.
  let { t, i, onswap } = $props();

  let open = $state(false);

  function toggle() {
    open = !open;
    onswap?.(open);
  }
</script>

<article class="cu-card rv" class:open use:reveal style:--i={i} style:--r={['-0.8deg', '0.6deg', '-0.5deg'][i] ?? '0deg'}>
  <div class="cu-in" use:tilt>
    <button type="button" class="cu-q" aria-expanded={open} aria-controls={'cu-a-' + t.id} onclick={toggle}>
      <span class="cu-mark" aria-hidden="true">{open ? '✓' : '?'}</span>
      <span>{t.q}</span>
      <small>{open ? 'got it' : t.hint}</small>
    </button>
    <div class="cu-a" id={'cu-a-' + t.id} inert={!open}><div><p>{t.a}</p></div></div>
  </div>
</article>
