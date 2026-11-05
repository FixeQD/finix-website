import './styles/fonts.css';

// Cascade order matters: tokens, base, then components, then motion/reduced-motion last.
import './styles/tokens.css';
import './styles/base.css';
import './styles/chrome.css';
import './styles/hero.css';
import './styles/sections.css';
import './styles/resources.css';
import './styles/finix.css';
import './styles/story.css';
import './styles/motion.css';

// Everything that hides content (.rv) is scoped under .js, so no-JS visitors see the full page.
document.documentElement.classList.add('js');
