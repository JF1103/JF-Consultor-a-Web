// Desplazamientos programáticos que respetan prefers-reduced-motion

export const scrollBehavior = (): ScrollBehavior =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';

// Equivalente a el.scrollIntoView({ behavior: 'smooth' }) para los botones internos
export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
}

// Posición absoluta sin transformaciones (las animaciones .reveal desplazan el rect visual)
export function absoluteTop(el: HTMLElement) {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

// Alto de la barra fija del header (sin el menú móvil desplegado)
export const headerBarHeight = () => document.getElementById('site-header-bar')?.offsetHeight ?? 80;

// Destino de la navegación principal: el encabezado de la sección, o el formulario en Contacto
export function sectionScrollTop(id: string) {
  if (id === 'home') return 0;
  const el = document.getElementById(id);
  if (!el) return null;
  let anchor: HTMLElement = el;
  if (id === 'download') anchor = el.querySelector('form')?.parentElement ?? el;
  else if (el.tagName === 'SECTION') anchor = el.querySelector('h2')?.parentElement ?? el;
  return Math.max(0, absoluteTop(anchor) - headerBarHeight() - 24);
}

// Navegación del header y el footer: deja el destino visible debajo de la barra fija
export function scrollToSection(id: string) {
  const top = sectionScrollTop(id);
  if (top === null) return false;
  window.scrollTo({ top, behavior: scrollBehavior() });
  return true;
}
