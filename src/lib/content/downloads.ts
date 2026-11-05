export interface InstallRoute {
  id: string;
  name: string;
  note: string;
  href: string;
  cta: string;
}

export const downloads: InstallRoute[] = [
  { id: 'flakes', name: 'Starter flakes', note: 'recommended · minimal or graphical template', href: 'https://github.com/finix-community/examples', cta: 'Open the examples' },
  { id: 'community', name: 'community-modules', note: 'community modules · in the spirit of the AUR', href: 'https://github.com/finix-community/community-modules', cta: 'Open the repo' },
  { id: 'iso', name: 'NixOS ISO', note: 'manual install · graphical or minimal image', href: 'https://nixos.org/download#nixos-iso', cta: 'Get the ISO' },
  { id: 'installer', name: 'Graphical installer', note: 'experimental · Calamares on a NixOS live ISO', href: 'https://github.com/finix-community/installer', cta: 'Open the repo' },
  { id: 'guide', name: 'Install guide', note: 'manual steps · flakes, channels or pinned inputs', href: 'https://finix-community.github.io/finix/installation.html', cta: 'Read the guide' },
  { id: 'source', name: 'Source', note: 'git clone · finix-community/finix', href: 'https://github.com/finix-community/finix', cta: 'Open GitHub' },
];
