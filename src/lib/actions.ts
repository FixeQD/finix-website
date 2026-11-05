import type { Action } from 'svelte/action';
let revealObserver: IntersectionObserver | undefined;

export const reveal: Action<HTMLElement> = (node) => {
  if (!revealObserver) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.06 },
    );
    revealObserver = observer;
  }
  revealObserver.observe(node);
  return { destroy: () => revealObserver?.unobserve(node) };
};

export const titleMorph: Action<HTMLElement> = (node) => {
  let cancelled = false;
  document.fonts.ready.then(() => {
    if (cancelled) return;
    const base = parseFloat(getComputedStyle(node).fontSize);
    const host = node.querySelector<HTMLElement>('.swap');
    const measure = (text: string): string => {
      if (!host) return '';
      const probe = document.createElement('span');
      probe.textContent = text;
      probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap';
      host.append(probe);
      const width = probe.getBoundingClientRect().width / base;
      probe.remove();
      return `${width}em`;
    };
    node.style.setProperty('--w-old', measure(node.querySelector('.swap-old')?.textContent ?? ''));
    node.style.setProperty('--w-new', measure(node.querySelector('.swap-new')?.textContent ?? ''));
    setTimeout(() => !cancelled && node.classList.add('morphed'), 900);
  });
  return { destroy: () => (cancelled = true) };
};

export const tilt: Action<HTMLElement, number | undefined> = (node, max = 5) => {
  if (matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return;
  const move = (e: PointerEvent) => {
    const r = node.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    node.style.transform = `perspective(800px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`;
  };
  const leave = () => (node.style.transform = '');
  node.addEventListener('pointermove', move);
  node.addEventListener('pointerleave', leave);
  return { destroy: () => { node.removeEventListener('pointermove', move); node.removeEventListener('pointerleave', leave); } };
};

export const magnet: Action<HTMLElement> = (node) => {
  if (matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return;
  const move = (e: PointerEvent) => {
    const r = node.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.12;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.2;
    node.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
  };
  const leave = () => (node.style.translate = '');
  node.addEventListener('pointermove', move);
  node.addEventListener('pointerleave', leave);
  return { destroy: () => { node.removeEventListener('pointermove', move); node.removeEventListener('pointerleave', leave); } };
};

export function scrollChrome(): () => void {
  let frame = 0;
  const update = () => {
    frame = 0;
    const root = document.documentElement;
    const max = root.scrollHeight - innerHeight;
    document.querySelector<HTMLElement>('.progress span')?.style.setProperty('--p', max > 0 ? Math.min(1, scrollY / max).toFixed(4) : '0');
    root.classList.toggle('scrolled', scrollY > 8);

    const heroEnded = (document.querySelector('.hero-cta')?.getBoundingClientRect().bottom ?? 1) < 0;
    const rect = document.getElementById('download')?.getBoundingClientRect();
    const downloadVisible = rect ? rect.top < innerHeight && rect.bottom > 0 : false;
    document.querySelector<HTMLElement>('.float-dl')?.classList.toggle('show', heroEnded && !downloadVisible);
  };
  const onScroll = () => (frame ||= requestAnimationFrame(update));
  addEventListener('scroll', onScroll, { passive: true });
  update();
  return () => removeEventListener('scroll', onScroll);
}
