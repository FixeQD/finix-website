<script>
  import { reveal } from '../../lib/actions';
  import Chapter from '../ui/Chapter.svelte';
  import CodeBlock from '../ui/CodeBlock.svelte';

  // The minimal starter flake from finix-community/examples, verbatim.
  const snippet = `{
  description = "Minimal finix flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    finix.url = "github:finix-community/finix";
  };

  outputs = inputs@{ self, nixpkgs, finix, ... }:
    let
      pkgs = import nixpkgs { system = "x86_64-linux"; };
    in
    {
      nixosConfigurations.finixos = finix.lib.finixSystem {
        inherit (pkgs) lib;

        modules = [
          { nixpkgs.pkgs = pkgs; }
          ./configuration.nix
        ];
      };
    };
}`;
</script>

<Chapter id="flake" kicker="$ cat flake.nix" title="Your system, in your flake" tone="green"
  intro="Add finix as an input, build your system with finix.lib.finixSystem, and list the modules you want.">
  <div class="flk">
    <CodeBlock title="flake.nix" code={snippet} />
    <ul class="flk-ticks">
      <li class="rv" use:reveal style:--r="-0.4deg"><b>Pinned like any other input</b><p>finix sits in lock steps with nixpkgs. Update it when you want, not when a rebuild says so.</p></li>
      <li class="rv" use:reveal style:--r="0.5deg"><b>Modules are listed explicitly</b><p>The modules list in finixSystem decides what loads. Nothing sneaks in behind your back.</p></li>
      <li class="rv" use:reveal style:--r="-0.5deg"><b>Start from a template</b><p>Use the template that writes the whole file: <code>nix flake init -t github:finix-community/examples#installation-minimal</code></p></li>
    </ul>
  </div>
</Chapter>
