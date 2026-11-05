<script>
  // A code print with a copy chip. Compared with the copyButtons action, this is one reactive
  // component instead of DOM surgery, so every code block on the page gets the same behaviour.
  import { reveal } from '../../lib/actions';
  import { hlNix, hlSh, hlText } from '../../lib/highlight';

  let { title, code, lang = 'nix' } = $props();

  const paints = { nix: hlNix, sh: hlSh, text: hlText };
  const html = $derived(paints[lang](code));

  let copied = $state(false);
  let timer;

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      clearTimeout(timer);
      timer = setTimeout(() => (copied = false), 1500);
    } catch {} // clipboard can be blocked: the code stays selectable as fall back
  }
</script>

<div class="code on-paper rv" use:reveal>
  <div class="code-title"><span>{title}</span><button type="button" class="wb-chip" onclick={copy}>{copied ? 'copied!' : 'copy'}</button></div>
  <pre><code>{@html html}</code></pre>
</div>
