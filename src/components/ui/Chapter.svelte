<script>
  // Chapter wrapper: red kicker, h2 with a highlighter phrase, intro, then the body (children).
  let { id, kicker = '', title, tone = 'yellow', intro = '', children } = $props();
  import { reveal } from '../../lib/actions';
</script>

<section class="chapter" {id} aria-labelledby={id + '-h'}>
  <header class="chapter-head rv" use:reveal>
    {#if kicker}<span class="chapter-no">{kicker}</span>{/if}
    <h2 id={id + '-h'}><span class="hl hl-{tone}">{title}</span></h2>
    {#if intro}<p>{intro}</p>{/if}
  </header>
  {@render children?.()}
</section>
