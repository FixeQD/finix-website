<script>
  import { curious } from '../../lib/content/curious';
  import Chapter from '../ui/Chapter.svelte';
  import AskCard from './AskCard.svelte';

  // The counter-to-CTA swap is a state machine: stages land one by one, each on the
  // transitionend of the element before (strike bar -> counter -> written line). No clock:
  // removing stage classes mid-flight simply rewinds the visuals with .instant.
  //   0 idle counts   ·   1 strike   ·   2 counter fades out   ·   3 line is written in
  let opened = $state(0);
  let stage = $state(0);
  let instant = $state(false);

  function swap(isOpen) {
    opened += isOpen ? 1 : -1;
    if (opened < curious.length && stage !== 0) return rewind();
    if (opened === curious.length && stage === 0) {
      // With reduced motion transitions never end, so the chain must start at the last stage.
      stage = matchMedia('(prefers-reduced-motion: reduce)').matches ? 3 : 1;
    }
  }

  function rewind() {
    instant = true;
    stage = 0;
    requestAnimationFrame(() => requestAnimationFrame(() => (instant = false)));
  }

  function advance(e) {
    if (!e.target.classList.contains('cu-strike-bar') && !e.target.classList.contains('cu-old')) return;
    if (stage === 1 && e.propertyName === 'transform') stage = 2;
    else if (stage === 2 && e.propertyName === 'opacity') stage = 3;
  }
</script>

<Chapter id="curious" kicker="$ man finix" title="Three questions people ask first" tone="pink"
  intro="Pick one. Nothing here is a sales pitch, just the answers.">
  <div class="cu">
    {#each curious as t, i (t.id)}
      <AskCard {t} {i} onswap={swap} />
    {/each}
  </div>

  <!-- Stage booleans are class: directives on purpose: the class attribute form rewrites className
       and would wipe .in from use:reveal back off the element. -->
  <p class="cu-count cu-swap" class:strike={stage >= 1} class:fly={stage >= 2} class:write={stage >= 3} class:instant aria-live="polite">
    <span class="cu-old" ontransitionend={advance} aria-hidden={stage >= 2 ? 'true' : undefined}>
      {#key opened}<span class="cu-num">{opened}</span>{/key} of {curious.length} uncovered
      <i class="cu-strike-bar" aria-hidden="true"></i>
    </span>
    <span class="cu-new">
      That is the short tour. <a href="#flake">Now see it in a flake →</a>
    </span>
  </p>
</Chapter>
