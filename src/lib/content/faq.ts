export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqGroup {
  id: string;
  title: string;
  items: FaqItem[];
}

export const faq: FaqGroup[] = [
  {
    id: 'faq-nixos',
    title: 'Coming from NixOS',
    items: [
      { q: 'Is finix a fork of NixOS?', a: 'No. It is a Nix based distribution with its own independent module set, so NixOS users can pick up its modules without much trouble.' },
      { q: 'Can I reuse my NixOS configuration?', a: 'Probably not as it is. Some modules are renamed or moved between programs and services, so expect to change several things. The options search lists what finix offers.' },
      { q: 'Do NixOS modules work on finix?', a: 'Some do without changes, most do not. To get one ported, open an issue on the GitHub repository.' },
      { q: 'Can I use another init system with finix?', a: 'Not at the moment. Supporting other init systems is being discussed.' },
      { q: 'Do I need to use flakes?', a: 'No. Finix can be installed and configured using channels, pinned inputs or flakes, and flakes are the generally recommended way to pin dependencies.' },
    ],
  },
  {
    id: 'faq-daily',
    title: 'Daily use',
    items: [
      { q: 'Can a distro without systemd run a desktop?', a: 'Yes. Modules cover the niri, sway, Hyprland, labwc, Openbox, LXQt and COSMIC desktops, plus login managers like greetd, ly and lemurs.' },
      { q: 'What replaced udev?', a: 'Finix ships four device managers: eudev, gardendevd, keventd and mdevd, and enables none of them. eudev has the broadest hardware support and mdevd is the leanest. With mdevd, graphical environments and pipewire need libudev-zero, and gvfs and udisks2 do not work.' },
      { q: 'Where do modules that are not in finix live?', a: 'In community-modules, a community maintained repository of finix modules for experimental, niche and fast moving ideas, in the spirit of the AUR.' },
      { q: 'Where can I see what other people run?', a: 'The finix discussions have a desktop show-and-tell thread. Browse other finix users\' desktops there.' },
      { q: 'Does finix support user level services?', a: 'Not yet. Finit has no user level service management, and it is planned for its next major version.' },
      { q: 'Does every service module work?', a: 'Not guaranteed. Many service modules worked at some point, and some have not been tried in a while. Consider them as they are.' },
      { q: 'Can I use home-manager?', a: 'Yes, through an implementation in the community modules repo. Most finix users run Hjem instead, a lighter alternative with experimental first party support.' },
    ],
  },
  {
    id: 'faq-project',
    title: 'The project',
    items: [
      { q: 'How is finix tested?', a: 'With VM tests in the tests folder: boot, dhcpcd, firewall, multi-node, shell, and finit checks for tmpfiles and remain-after-exit.' },
      { q: 'Where do I ask for help?', a: 'On the finix Discord, or by opening an issue on GitHub.' },
      { q: 'Can I contribute?', a: 'Yes: docs, software modules and core changes. Ideas go into IDEAS.md as a pull request, but only from contributors to the finix-community organization.' },
    ],
  },
];
