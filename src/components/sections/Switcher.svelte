<script>
  import Chapter from '../ui/Chapter.svelte';

  // One row per aspect, NixOS column against finix. Facts follow docs/manual/finix-vs-nixos.md;
  // rows that are literally the same on both sides say so instead of being padded out.
  const rows = [
    { t: 'Package manager', a: 'Nix, with flakes, channels or pinned inputs', b: 'The same as NixOS.' },
    { t: 'Config', a: 'Declarative. One configuration, you rebuild to change it.', b: 'The same as NixOS.' },
    { t: 'Modules', a: 'Every module set imported into each system by default.', b: 'Named options in the same shape, but only the modules you import load. community-modules fills the gap, a bit like the AUR.' },
    { t: 'Pid 1', a: 'systemd.', b: 'finit. Services are attribute sets under finit.services, with a condition system for dependencies and getty built in.' },
    { t: 'Defaults', a: 'All of NixOS evaluates into every system.', b: '6 programs and 8 services. Opt in beyond that, and evaluation stays fast.' },
    { t: 'Device manager', a: 'udev.', b: 'Your pick of four: eudev, gardendevd, keventd or mdevd. None is enabled until you choose.' },
    { t: 'User services', a: 'systemd user units.', b: 'None yet. Planned for finit\'s next major version.' },
    { t: 'Stability', a: 'A stable branch on offer.', b: 'None. Breaking changes happen; it runs on its author\'s primary laptop and works as a desktop, homelab server or gaming PC if you can keep up.' },
    { t: 'Your NixOS config', a: 'Home ground.', b: 'Probably will not work as it is. Expect to change several things; some modules moved between programs and services, like pipewire.' },
  ];
</script>

<Chapter id="nixos" kicker="$ diff nixos finix" title="finix next to NixOS" tone="orange"
  intro="Same package manager, different defaults. The honest version, in one table.">
  <div class="sw">
    <div class="sw-scroll">
      <table class="sw-table">
        <caption class="sw-caption">Aspects compared: NixOS against finix</caption>
        <thead>
          <tr><th scope="col"></th><th scope="col">NixOS</th><th scope="col">finix</th></tr>
        </thead>
        <tbody>
          {#each rows as r (r.t)}
            <tr>
              <th scope="row">{r.t}</th>
              <td>{r.a}</td>
              <td>{r.b}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</Chapter>
