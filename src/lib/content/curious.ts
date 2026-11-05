export interface Teaser {
  id: string;
  q: string;
  hint: string;
  a: string;
}

export const curious: Teaser[] = [
  {
    id: 'strange',
    q: 'What is the strangest thing finix has run on?',
    hint: 'laptops are the boring answer',
    a: 'Laptops, homelab servers, media centers and gaming PCs are the usual ones. Community experiments include a musl based desktop, systems with no stage 1 or no stage 2, and an embedded board (finix-rk3506).',
  },
  {
    id: 'udev',
    q: 'What replaced udev?',
    hint: 'you get to choose',
    a: 'Finix ships four device managers: eudev, gardendevd, keventd and mdevd, and enables none of them. eudev has the broadest hardware support and mdevd is the leanest. With mdevd, graphical environments and pipewire need libudev-zero, and gvfs and udisks2 do not work.',
  },
  {
    id: 'community',
    q: 'Where do modules that are not in finix live?',
    hint: 'think AUR',
    a: 'In community-modules: a community maintained repository of finix modules for experimental, niche and fast moving ideas, in the spirit of the AUR. You add it as a flake input and pull modules by name.',
  },
];
