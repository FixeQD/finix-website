// Tiny highlighting for the snippets on this page, no dependency.
// The snippets are static and small, so a few hand-drawn rules beat a full parser:
//  - hlNix: flake/module fragments (strings, comments, angle paths, let/in/inherit...)
//  - hlSh:  shell commands like nix flake init and dd (command word, flags, template fragments)
//  - hlText: no highlighting, just escape
// Returns HTML: escape first, then wrap tokens in <span class="t-*">. Do not feed it user input.

const ESC: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };
const esc = (s: string): string => s.replace(/[&<>]/g, (c) => ESC[c]);

const NIX = [
  ['s', /("(?:[^"\\]|\\.)*")/],      // string
  ['c', /(#[^\n]*)/],                // comment
  ['p', /(<[\w./-]+>)/],             // angle path like <nixpkgs>
  ['k', /\b(let|in|with|inherit|import|assert|if|then|else|rec|true|false|null)\b/],
  ['a', /([A-Za-z_][\w.'-]*(?=\s*=))/], // attribute name
  ['n', /\b(\d+)\b/],                // number
] as const;

const CLS = 'class="t-';
const wrap = (cls: string, text: string): string => `<span ${CLS}${cls}">${text}</span>`;

export function hlNix(source: string): string {
  return esc(source).replace(
    new RegExp(NIX.map(([, re]) => re.source).join('|'), 'g'),
    (m, s, c, p, k, a, n) =>
      s !== undefined ? wrap('s', s) : c !== undefined ? wrap('c', c)
      : p !== undefined ? wrap('p', p) : k !== undefined ? wrap('k', k)
      : a !== undefined ? wrap('a', a) : wrap('n', n),
  );
}

export function hlSh(source: string): string {
  return esc(source)
    .replace(/(^|\n)([ \t]*#[^\n]*)/g, (_m, br, comment) => br + wrap('c', comment)) // comment lines
    .replace(/(^|\n)([ \t]*[a-z][\w-]*)/g, (_m, br, cmd) => br + wrap('a', cmd)) // the command word
    .replace(/(#[\w./-]+)/g, (m) => wrap('u', m)); // flake template fragments
}

export const hlText = esc;
