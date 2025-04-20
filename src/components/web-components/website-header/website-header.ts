// src/components/web-components/WebComponentTemplate.ts

export class WebsiteHeader extends HTMLElement {
  private shadow: ShadowRoot;
  private theAvatarSvg: string;
  private comicDialogText: string;
  private headerTitle: string;
  private headerSubtitle: string;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.theAvatarSvg = this.getAttribute('the-avatar') || "/public/images/default-avatar.svg";
    this.comicDialogText = this.getAttribute('comic-dialog-text') || "Hello There! Welcome to my Site!";
    this.headerTitle = this.getAttribute('header-title') || "John Doe";
    this.headerSubtitle = this.getAttribute('header-subtitle') || "UX/UI Designer";
  }

  static get observedAttributes(): string[] {
    return ["the-avatar", "comic-dialog-text", "header-title", "header-subtitle"];
  }

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue !== newValue) {
      this.render();
      this.attachEvents();
    }
  }

  connectedCallback(): void {
    this.render();
    this.attachEvents();
  }

  disconnectedCallback(): void {
    this.removeEvents();
  }

  private render(): void {
    this.shadow.innerHTML = '';
    this.shadow.appendChild(this.getTemplate().content.cloneNode(true));
  }

  private getTemplate(): HTMLTemplateElement {
    const template = document.createElement('template');
    template.innerHTML = /*html */ `
      <style>${this.getStyles()}</style>
      <header class="website-header">
        <div class="website-header__content-wrapper">
          <img class="website-header__avatar" src="${this.theAvatarSvg}" alt="Avatar">
          <div class="avatar__dialog-wrapper">
            <div class="avatar__dialog">
              <span class="dialog">${this.comicDialogText}</span>
            </div>
          </div>
          <div class="website-header__titles">
            <a class="home-link" href="/">
              <h1 class="website-header__header-title">${this.headerTitle}</h1>
              <h2 class="website-header__header-subtitle">&nbsp;&nbsp;${this.headerSubtitle}</h2>
            </a>
          </div>
        </div>
      </header>
    `;
    return template;
  }

  private getStyles(): string {
    return /*css */ `
      /* <website-header> */
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      :host {
        position: relative;
        width: 100%;
      }
      a {
        text-decoration: none;
        color: inherit;
      }
      .website-header {
        width: 100%;
      }
      .website-header__content-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2%;
        width: 100%;
      }
      @keyframes showDialog {
        from {
          opacity: 0;
          transform: translateX(0) scale(0);
        }
        to {
          opacity: 1;
          transform: translateX(-40px) scale(1);
        }
      }

      @keyframes hideDialog {
        from {
          opacity: 1;
          transform: translateX(-40px) scale(1);
        }
        to {
          opacity: 0;
          transform: translateX(0) scale(0);
        }
      }
      .website-header__avatar {
        width: clamp(6rem, 10vw, 12rem);
        object-fit: cover;
        transition: transform 500ms;
        cursor: pointer;
      }
      .avatar__dialog-wrapper {
        position: absolute;
        left: -90%;
        top: -40px;
        color: var(--black);
        font-family: var(--font-dialog-balloon);
        font-size: 1.4rem;
        line-height: 110%;
        text-align: center;
        opacity: 0;
        transform: scale(0);
        transition: opacity 300ms, transform 300ms;
        pointer-events: none;
        z-index: 1000;
      }
      .avatar__dialog-wrapper.active {
        animation: showDialog 400ms forwards ease-out;
        pointer-events: auto;
      }
      .avatar__dialog-wrapper.hide {
        animation: hideDialog 300ms forwards ease-in;
      }
      .avatar__dialog {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 125px;
        aspect-ratio: 1.37 / 1;
        background-image: url("/images/dialog-balloon.svg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
      .dialog {
        display: inline-block;
        width: 85%;
      }
      .website-header__titles {
        font-weight: 400;
        font-style: normal;
      }
      .home-link {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .website-header__header-title {
        font-family: var(--font-heading);
        font-size: clamp(4rem, 6vw, 8rem);
        line-height: 85%;
      }
      .website-header__header-subtitle {
        font-size: clamp(1.8rem, 2.5vw, 3.5rem);
        font-family: var(--font-body);
        font-weight: 300;
        font-style: normal;
      }
    `;
  }

  private attachEvents(): void {
    
  }
  

  private removeEvents(): void {
    // Limpia listeners aquí
  }
}

if (!customElements.get('website-header')) {
  customElements.define('website-header', WebsiteHeader);
}

export default WebsiteHeader;
