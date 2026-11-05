<script>
  import { reveal } from '../../lib/actions';
  import Chapter from '../ui/Chapter.svelte';
  import CodeBlock from '../ui/CodeBlock.svelte';
</script>

<Chapter id="modules" kicker="$ ls community-modules" title="Modules beyond core" tone="cyan"
  intro="A community maintained repository of finix modules: niche integrations, opinionated modules and fast moving ideas, in the spirit of the AUR.">
  <div class="cm">
    <div>
      <CodeBlock title="Add the repo, then name the modules" code={`inputs.community-modules.url = "github:finix-community/community-modules";

# inside finix.lib.finixSystem:
modules = with inputs.community-modules.nixosModules; [
  pipewire
  v2rayn
  amnezia-vpn
];`} />
      <p class="cm-extra rv" use:reveal><small>Also inside: <code>dinit</code> modules and <code>hjemModules</code> for the Hjem setup.</small></p>
    </div>

    <aside class="cm-note on-paper rv" use:reveal style:--r="1deg">
      <h3>Like the AUR, with the AUR&apos;s trade</h3>
      <p>Modules for niche integrations and fast moving ideas. Expect them to change quickly and to vary in quality: that is the deal for moving fast.</p>
      <a class="cm-cta" href="https://github.com/finix-community/community-modules">Browse the repo →</a>
    </aside>
  </div>
</Chapter>
