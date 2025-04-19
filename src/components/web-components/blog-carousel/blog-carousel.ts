// src/components/web-components/BlogCarousel.ts

export class BlogCarousel extends HTMLElement {
  private shadow: ShadowRoot;
  private currentIndex = 0;
  private totalSlides = 5;
  private slideWidth = 600;
  private slideInterval?: ReturnType<typeof setInterval>;
  private direction = 1;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes(): string[] {
    return ['data-prop'];
  }

  attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null): void {
    if (oldVal !== newVal) this.render();
  }

  connectedCallback(): void {
    this.render();
    this.startAutoSlide();
    this.addA11yFeatures();

    const carousel = this.shadow.querySelector('.carousel-track');
    if (carousel) {
      carousel.addEventListener('mouseenter', this.pauseAutoSlide);
      carousel.addEventListener('mouseleave', this.startAutoSlide);
      carousel.addEventListener('touchstart', this.pauseAutoSlide, { passive: true });
      carousel.addEventListener('touchend', this.startAutoSlide);
    }

    const card = this.shadow.querySelector('.blog-card');
    if (card) {
      this.slideWidth = card.clientWidth;
    }
  }

  disconnectedCallback(): void {
    clearInterval(this.slideInterval);
    const card = this.shadow.querySelector('.blog-card');
    if (card) {
      card.removeEventListener('keydown', this.handleKeyDown as EventListener);
    }
  }

  private render(): void {
    this.shadow.innerHTML = '';
    this.shadow.appendChild(this.getTemplate().content.cloneNode(true));
  }

  private getTemplate(): HTMLTemplateElement {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="carousel-wrapper">
        <div class="carousel-track">
          ${this.getSlides(this.totalSlides)}
        </div>
      </div>
    `;
    return template;
  }

  private getSlides(count: number): string {
    const slide = `
      <div class="blog-card">
        <img src="https://picsum.photos/480/360?grayscale" alt="Imagen del post" />
        <div class="blog-card__content">
          <h2 class="blog-card__title">Título del Post</h2>
          <p class="blog-card__excerpt">Este es un pequeño resumen del contenido del post para atrapar tu atención.</p>
          <span class="blog-card__cta">Leer más</span>
        </div>
      </div>
    `;
    return new Array(count).fill(slide).join('');
  }

  private getStyles(): string {
    return `/* Aquí van tus estilos CSS originales (omitidos por brevedad) */`;
  }

  private handleKeyDown = (e: KeyboardEvent): void => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target === this.shadow.querySelector('.blog-card')) {
      this.shadow.querySelector('.blog-card__cta')?.dispatchEvent(new MouseEvent('click'));
    }
  };

  private addA11yFeatures(): void {
    const card = this.shadow.querySelector('.blog-card');
    if (card) {
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.addEventListener('keydown', this.handleKeyDown as EventListener);
    }
  }

  private startAutoSlide = (): void => {
    clearInterval(this.slideInterval);
    this.direction = 1;
    this.slideInterval = setInterval(this.loopSlide, 5000);
  };

  private pauseAutoSlide = (): void => {
    clearInterval(this.slideInterval);
  };

  private loopSlide = (): void => {
    const track = this.shadow.querySelector('.carousel-track') as HTMLElement;
    if (!track) return;

    this.currentIndex++;

    if (this.currentIndex >= this.totalSlides) {
      this.currentIndex = 0;
      track.style.transition = 'none';
      track.style.transform = 'translateX(0px)';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          track.style.transition = 'transform 0.5s ease';
        });
      });
    } else {
      const offset = this.currentIndex * this.slideWidth;
      track.style.transform = `translateX(-${offset}px)`;
    }
  };
}

if (!customElements.get('blog-carousel')) {
  customElements.define('blog-carousel', BlogCarousel);
}

export default BlogCarousel;
