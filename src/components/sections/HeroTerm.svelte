<script>
  import { tick } from 'svelte';

  // The console lines tests/boot.nix waits for, in order.
  const bootLines = ['finix - stage 1', 'finix - stage 2', 'entering runlevel S', 'entering runlevel 2', 'getty on /dev/tty1'];
  const hints = ['cat /proc/1/comm', 'systemctl', 'help'];

  let run = $state(0);
  let out = $state([]);
  let value = $state('');
  let logEl;

  const known = {
    help: () => ['help, cat /proc/1/comm, systemctl, initctl, reboot, clear'],
    'cat /proc/1/comm': () => ['finit'],
    initctl: () => ["initctl is finit's control tool. A real finix machine prints the service list here."],
  };

  function exec(raw) {
    const cmd = raw.trim();
    if (!cmd) return;
    if (cmd === 'clear') { out = []; return; }
    if (cmd === 'reboot') { out = []; run++; return; }
    let lines;
    let err = false;
    if (cmd === 'systemctl') { lines = ['systemctl: command not found', 'this is finit land. try: initctl']; err = true; }
    else if (known[cmd]) lines = known[cmd]();
    else { lines = [`${cmd.split(' ')[0]}: command not found`, 'this console is a sketch. type help']; err = true; }
    out = [...out, { cmd, lines, err }];
    tick().then(() => logEl && (logEl.scrollTop = logEl.scrollHeight));
  }

  function submit(e) {
    e.preventDefault();
    exec(value);
    value = '';
  }
</script>

<figure class="hero-art">
  <span class="tape tl" aria-hidden="true"></span>
  <div class="wb-term hx-term">
    <div class="wb-bar"><i></i><i></i><i></i><span>console</span><button type="button" onclick={() => exec('reboot')}>reboot</button></div>
    <div class="wb-log" bind:this={logEl} role="log" aria-live="polite">
      {#key run}
        <div class="hx-boot">
          {#each bootLines as l, i (l)}<p style:--n={i}>{l}</p>{/each}
        </div>
      {/key}
      <div class="hx-out">
        {#each out as o, i (i)}
          <p class="cmd">{o.cmd}</p>
          {#each o.lines as l (l)}<p class:err={o.err}>{l}</p>{/each}
        {/each}
      </div>
    </div>
    <form class="hx-prompt" onsubmit={submit}>
      <span aria-hidden="true">$</span>
      <input bind:value type="text" aria-label="Type a command into the sketch console" placeholder="type something" autocomplete="off" autocapitalize="off" spellcheck="false" />
    </form>
  </div>
  <p class="hx-hints">
    <span>psst, try</span>
    {#each hints as h (h)}<button type="button" onclick={() => exec(h)}>{h}</button>{/each}
  </p>
</figure>
