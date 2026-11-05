<script>
  import ThemeToggle from './ThemeToggle.svelte';
</script>

<div class="progress" aria-hidden="true"><span></span></div>

<header class="top">
  <a class="brand" href="#top" aria-label="finix home"><img src="/img/icon.svg" alt="" width="34" height="34" /> finix</a>
  <nav aria-label="Main">
    <a href="#boot">How it boots</a>
    <a href="#flake">In your flake</a>
    <a href="#modules">Modules</a>
    <a href="#nixos">vs NixOS</a>
    <a href="#faq">FAQ</a>
    <ThemeToggle />
    <a class="nav-dl" href="#download"><svg aria-hidden="true"><use href="#i-dl" /></svg> Install</a>
  </nav>
</header>
