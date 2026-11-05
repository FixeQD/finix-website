<script>
  import { onMount } from 'svelte';
  import { scrollChrome } from './lib/actions';

  // layout: everything the page is framed with
  import SvgDefs from './components/layout/SvgDefs.svelte';
  import Header from './components/layout/Header.svelte';
  import Footer from './components/layout/Footer.svelte';
  import Float from './components/layout/Float.svelte';
  // sections: one per page chapter, in reading order
  import Hero from './components/sections/Hero.svelte';
  import BootStory from './components/sections/BootStory.svelte';
  import Curious from './components/sections/Curious.svelte';
  import Flake from './components/sections/Flake.svelte';
  import Anatomy from './components/sections/Anatomy.svelte';
  import Modules from './components/sections/Modules.svelte';
  import Switcher from './components/sections/Switcher.svelte';
  import Install from './components/sections/Install.svelte';
  import Faq from './components/sections/Faq.svelte';
  import Finale from './components/sections/Finale.svelte';

  onMount(() => scrollChrome());
</script>

<SvgDefs />
<Header />

<main id="top">
  <Hero />
  <BootStory />
  <Curious />
  <Flake />
  <Anatomy />
  <Modules />
  <Switcher />
  <Install />
  <Faq />
  <Finale />
</main>

<Float />
<Footer />
