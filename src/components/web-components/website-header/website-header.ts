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
          <div class="website-header__avatar-wrapper">
            <img class="website-header__avatar" src="${this.theAvatarSvg}" alt="Avatar">
            <div class="avatar__dialog-wrapper">
              <div class="avatar__dialog">
                <span class="dialog">${this.comicDialogText}</span>
              </div>
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

      .website-header__avatar-wrapper {
        position: relative;
      }
      
      .website-header__avatar {
        width: clamp(6rem, 10vw, 12rem);
        object-fit: cover;
        transition: transform 500ms;
        cursor: pointer;
      }
      .avatar__dialog-wrapper {
        position: absolute;
        top: -43px;
        left: -128px; 
        color: var(--black);
        font-family: var(--font-dialog-balloon);
        font-size: 1.4rem;
        line-height: 110%;
        text-align: center;
        /* animacion */
        opacity: 0;
        transform: translateX(40px) scale(0);
        transform-origin: left center;
        transition: transform 400ms ease, opacity 400ms ease;
        pointer-event: none;
        z-index: 1000;
      }

      .avatar__dialog-wrapper.visible {
        opacity: 1;
        transform: translateX(0) scale(1);
        pointer-events: auto;
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
      .website-header__avatar:hover {
          transform: scale(1.1) rotate(360deg)
        }
      .inactive {
        display: none;
      }
      .avatar-transition {
        width: 50px;
        transition: width 500ms;
      }
      .header-transition {
        position: absolute;
        top: 10px;
        right: 10px;
        transition: all 500ms; 
      }
      .fade-out-titles {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: opacity 200ms ease, visibility 200ms ease;
      } 
      @hover (hover: hover) {
        
      }
    `;
  }

  private attachEvents(): void {

    const avatar = this.shadow?.querySelector('.website-header__avatar');
    const dialog = this.shadow?.querySelector('.avatar__dialog-wrapper');
    if (!avatar || !dialog) return;
    let timeoutId: number | null = null;

    const showDialog = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        dialog.classList.remove('visible');
        void (dialog as HTMLElement).offsetWidth;
      }
      dialog.classList.add('visible');

      timeoutId = window.setTimeout(() => {
        dialog.classList.remove('visible');
        timeoutId = null;
      },5000);
    };

    avatar.addEventListener('click', () => {
      showDialog();
    })

    setTimeout(() => {
      showDialog();
    }, 1000);
  };
  

  private removeEvents(): void {
    // Limpia listeners aquí
  }
}

if (!customElements.get('website-header')) {
  customElements.define('website-header', WebsiteHeader);
}

export default WebsiteHeader;
