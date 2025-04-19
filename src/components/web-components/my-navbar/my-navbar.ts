// src/components/web-components/MyNavbar.ts
export class MyNavbar extends HTMLElement {
  private shadow: ShadowRoot;
  private activeIndex: number = 0;
  private svgIcons: Record<string, string>;
  private links: Record<string, string>;
  private icons: { name: string; label: string }[];

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });

    this.svgIcons = {
      'Home': `...`, // Recortar por brevedad, igual que en original
      'Book-open': `...`,
      'Portfolio': `...`,
      'Github': `...`,
      'Facebook': `...`,
      'Twitter': `...`
    };

    this.links = {
      'Home': this.getAttribute('home-link') || '#',
      'Book-open': this.getAttribute('blog-link') || '#',
      'Portfolio': this.getAttribute('portfolio-link') || '#',
      'Github': this.getAttribute('github-link') || '#',
      'Facebook': this.getAttribute('facebook-link') || '#',
      'Twitter': this.getAttribute('twitter-link') || '#',
    };

    this.icons = [
      { name: 'Home', label: 'Inicio' },
      { name: 'Book-open', label: 'Blog' },
      { name: 'Portfolio', label: 'Portafolio' },
      { name: 'Github', label: 'Github' },
      { name: 'Facebook', label: 'Facebook' },
      { name: 'Twitter', label: 'Twitter' },
    ];
  }

  static get observedAttributes(): string[] {
    return [
      'active-index',
      'home-link', 'blog-link', 'portfolio-link',
      'github-link', 'facebook-link', 'twitter-link'
    ];
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    if (oldValue !== newValue && name === 'active-index') {
      this.activeIndex = parseInt(newValue || '0', 10);
      this.render();
    }
  }

  connectedCallback() {
    this.render();
    this.checkHover();
  }

  disconnectedCallback() {
    // Future cleanup if needed
  }

  private render() {
    this.shadow.innerHTML = '';
    this.shadow.appendChild(this.getTemplate().content.cloneNode(true));

    this.shadow.querySelectorAll('.nav-item').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const index = parseInt((e.currentTarget as HTMLElement).dataset.index || '0', 10);
        this.handleNavClick(index);
      });
    });
  };

  private getTemplate(): HTMLTemplateElement {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>${this.getStyles()}</style>
      <nav role="navigation" aria-label="Navegación inferior">
        ${this.icons
          .map((icon, index) => {
            const isSPA = icon.name === 'Home' || icon.name === 'Book-open';
            const hrefAttr = isSPA ? '' : `href="${this.links[icon.name]}" target="_blank"`;
            return `
              <button class="nav-item ${index === this.activeIndex ? 'active' : ''} ${icon.name}" 
                      aria-label="${icon.label}" 
                      data-index="${index}" 
                      tabindex="0">
                <div class="icon-container">
                  <a ${hrefAttr} aria-label="${icon.label}" target="_blank">
                    ${this.svgIcons[icon.name]}
                  </a>
                </div>
                <span class="icon-label">${icon.label}</span>
              </button>
            `;
          })
          .join('')}
      </nav>
    `;
    return template;
  }

  private getStyles(): string {
    return `...`; // puedes mantener esto como en original o modularizar luego
  }

  private handleNavClick(index: number) {
    this.setAttribute('active-index', index.toString());
    this.dispatchEvent(
      new CustomEvent('nav-change', {
        detail: { index },
        bubbles: true,
        composed: true
      })
    );
  }

  private checkHover() {
    if (window.matchMedia('(hover: hover)').matches) {
      this.classList.add('has-hover');
    }
  }
}

if (!customElements.get('my-navbar')) {
  customElements.define('my-navbar', MyNavbar);
}

export default MyNavbar;
