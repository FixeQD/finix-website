<script>
  import { reveal } from '../../lib/actions';
  import { faq } from '../../lib/content/faq';

  let q = $state('');
  let needle = $derived(q.trim().toLowerCase());
  let groups = $derived(
    faq
      .map((g) => ({ ...g, items: g.items.filter((i) => !needle || (i.q + ' ' + i.a).toLowerCase().includes(needle)) }))
      .filter((g) => g.items.length),
  );
  let count = $derived(groups.reduce((n, g) => n + g.items.length, 0));
</script>

<section class="readme faq" id="faq" aria-labelledby="faq-h">
  <h2 id="faq-h" class="rv" use:reveal><span class="hl hl-blue">Still wondering?</span></h2>
  <div class="faq-wrap">
    <nav class="faq-nav rv" use:reveal aria-label="FAQ topics">
      <div class="wb-tools faq-search">
        <input type="search" placeholder="search the answers" aria-label="Search the FAQ" bind:value={q} />
      </div>
      {#each faq as group}<a href={'#' + group.id}>{group.title}</a>{/each}
    </nav>
    <div class="faq-list">
      {#each groups as group (group.id)}
        <div class="faq-group" id={group.id}>
          <h3 class="faq-gh">{group.title}</h3>
          {#each group.items as item (item.q)}
            <details class="qa" open={!!needle}><summary><h4>{item.q}</h4></summary><p>{item.a}</p></details>
          {/each}
        </div>
      {:else}
        <p class="faq-none">Nothing matches that. Ask on Discord or open an issue, both are in the footer.</p>
      {/each}
      {#if needle}<p class="faq-count" aria-live="polite">{count} {count === 1 ? 'answer' : 'answers'}</p>{/if}
    </div>
  </div>
</section>
