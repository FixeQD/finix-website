<script>
  import { titleMorph, magnet } from '../../lib/actions';
  import HeroTerm from './HeroTerm.svelte';
</script>

<section class="hero" aria-labelledby="title">
  <div class="hero-copy">
    <h1 id="title" use:titleMorph>
      <span class="h1-k">fast init nix</span>
      <span class="h1-a">Nix, but with</span>
      <span class="scribble in"><span class="swap"><span class="swap-old" aria-hidden="true">systemd</span><span class="swap-new">finit</span></span></span>
    </h1>
    <p class="lead">
      An experimental Linux distribution around the <mark class="m-blue">Nix</mark> package manager. Pid 1 is <mark class="m-orange">finit</mark>, and your config only loads the modules you import.
      <mark class="m-green">Your system is a flake output</mark>: import the modules you want, and nothing else.
    </p>
    <div class="hero-cta">
      <a class="dl dl-main" href="#flake" use:magnet>
        <svg class="dl-ico" aria-hidden="true"><use href="#i-flake" /></svg>
        <span><b>Use it in your flake</b><small>add finix as an input, import modules</small></span>
      </a>
      <a class="ghost" href="#download">Install from an ISO</a>
    </div>
  </div>
  <HeroTerm />
</section>
