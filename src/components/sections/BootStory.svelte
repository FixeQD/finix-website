<script>
  import { onMount } from 'svelte';
  import Chapter from '../ui/Chapter.svelte';

  // Console lines are the ones tests/boot.nix waits for. The notes follow modules/finit/options.nix.
  const steps = [
    { lines: ['finix - stage 1'], h: 'The first sign of life', p: 'The very first thing the system prints. No disks mounted, no services running yet, only the kernel handing over to finit.' },
    { lines: ['finix - stage 2'], h: 'Finit takes the wheel', p: 'On a finix system pid 1 is finit, and its boot sequence starts here. No systemd anywhere in the chain.' },
    { lines: ['entering runlevel S', 'entering runlevel 2'], h: 'Runlevels, not targets', p: 'Finit boots through S, then enters the runlevel from finit.runlevel, 2 by default. Services you imported start as their conditions are met.' },
    { lines: ['getty on /dev/tty1'], h: 'A login prompt', p: 'Getty on the first console means the boot is done: that waiting cursor is yours to type into.' },
  ];

  let active = $state(0);
  let list;

  onMount(() => {
    const io = new IntersectionObserver(
      (entries) => { for (const e of entries) if (e.isIntersecting) active = Number(e.target.dataset.step); },
      { rootMargin: '-42% 0px -42% 0px' },
    );
    for (const el of list.querySelectorAll('.bs-step')) io.observe(el);
    return () => io.disconnect();
  });
</script>

<Chapter id="boot" kicker="$ dmesg | head" title="From power button to login" tone="blue"
  intro="Scroll. Four things happen between pressing the button and typing your password.">
  <div class="bs">
    <div class="bs-stick">
      <div class="wb-term bs-term">
        <div class="wb-bar"><i></i><i></i><i></i><span>step {active + 1} of {steps.length}</span></div>
        <div class="wb-log bs-log" aria-live="off">
          {#each steps as s, si (si)}
            {#each s.lines as l (l)}<p class:on={si <= active} class:now={si === active}>{l}</p>{/each}
          {/each}
        </div>
      </div>
      <div class="bs-dots" aria-hidden="true">{#each steps as _, i (i)}<i class:on={i <= active}></i>{/each}</div>
    </div>

    <ol class="bs-steps" bind:this={list}>
      {#each steps as s, i (i)}
        <!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
        <li class="bs-step" class:on={i === active} data-step={i} onclick={() => (active = i)} onkeydown={(e) => e.key === 'Enter' && (active = i)} tabindex="0">
          <span class="no">{i + 1}</span>
          <h3>{s.h}</h3>
          <p>{s.p}</p>
        </li>
      {/each}
    </ol>
  </div>
</Chapter>
