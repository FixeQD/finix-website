// Build time only: renders the page to HTML so crawlers and no-JS visitors get the full content.
import { render } from 'svelte/server';
import App from './App.svelte';
import { faq } from './lib/content/faq';
import { curious } from './lib/content/curious';

export function renderPage(): string {
  return render(App, {}).body;
}

/** Structured data for the landing page: the software itself and its questions and answers. */
export function homeJsonLd(): object[] {
  const questions = [...curious.map((c) => ({ q: c.q, a: c.a })), ...faq.flatMap((g) => g.items)];
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'finix',
      description: 'An experimental Linux distribution built around the Nix package manager, with finit as pid 1 instead of systemd.',
      applicationCategory: 'OperatingSystem',
      operatingSystem: 'Linux',
      license: 'https://github.com/finix-community/finix/blob/main/COPYING',
      sameAs: ['https://github.com/finix-community/finix', 'https://github.com/finix-community/community-modules', 'https://finix-community.github.io/finix'],
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: questions.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ];
}
