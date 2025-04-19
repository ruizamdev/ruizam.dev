// src/components/web-components/ThemeToggle.ts

export class ThemeToggle extends HTMLElement {
  private shadow: ShadowRoot;
  private schemeListener?: MediaQueryList;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.handleSystemChange = this.handleSystemChange.bind(this);
  }

  connectedCallback(): void {
    this.render();
    this.checkHover();
    requestAnimationFrame(() => this.setInitialTheme());

    this.shadow.querySelector('button')?.addEventListener('click', () => this.toggleTheme());

    this.schemeListener = window.matchMedia('(prefers-color-scheme: dark)');
    this.schemeListener.addEventListener('change', this.handleSystemChange);
  }

  disconnectedCallback(): void {
    this.shadow.querySelector('button')?.removeEventListener('click', () => this.toggleTheme());
    this.schemeListener?.removeEventListener('change', this.handleSystemChange);
  }

  private render(): void {
    this.shadow.innerHTML = '';
    this.shadow.appendChild(this.getTemplate().content.cloneNode(true));
  }

  private getTemplate(): HTMLTemplateElement {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>${this.getStyles()}</style>
      <button class="theme-icon-container" aria-label="Cambiar tema" title="Cambiar tema">
        <span class="icon face-icon"></span>
      </button>
    `;
    return template;
  }

  private getStyles(): string {
    return `/* tus estilos originales aquí, listos para modularizar luego */`;
  }

  private checkHover(): void {
    if (window.matchMedia('(hover: hover)').matches) {
      this.classList.add('has-hover');
    }
  }

  private toggleTheme(): void {
    const root = document.documentElement;
    const isDark = root.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    this.updateIcon();
  }

  private setInitialTheme(): void {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    this.updateIcon();
  }

  private handleSystemChange(e: MediaQueryListEvent): void {
    const saved = localStorage.getItem('theme');
    if (!saved) {
      document.documentElement.classList.toggle('dark', e.matches);
      this.updateIcon();
    }
  }

  private updateIcon(): void {
    const isDark = document.documentElement.classList.contains('dark');
    const fallback = this.shadow.querySelector('.icon');

    if (fallback) {
      fallback.classList.add('fade-out');

      setTimeout(() => {
        fallback.innerHTML = isDark
          ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun-icon"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
          : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon-icon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;

        fallback.classList.remove('fade-out');
      }, 300);
    }
  }
}

if (!customElements.get('theme-toggle')) {
  customElements.define('theme-toggle', ThemeToggle);
}

export default ThemeToggle;
