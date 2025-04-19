// src/components/web-components/WebComponentTemplate.ts

export class RuizamHeader extends HTMLElement {
  private shadow: ShadowRoot;
  private theAvatarSvg: string;
  private comicDialogText: string;
  private headerTitle: string;
  private headerSubtitle: string;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.theAvatarSvg = this.getAttribute('the-avatar') || `<svg fill="#B1BABF" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 110.44"><path d="M46.07 68.62a19.25 19.25 0 0 1-1.63-2c-1.2-1.65-2.33-3.37-3.42-5.1l-5.42-8.63c-2.06-3-3.14-5.74-3.14-7.91s1.23-5 3.68-5.63a149.33 149.33 0 0 1-.21-15.61 19.7 19.7 0 0 1 .65-3.58 20.63 20.63 0 0 1 9.21-11.7 23.65 23.65 0 0 1 5-2.39c3.15-1.19 1.63-6 5.1-6.07C64-.21 77.33 6.73 82.53 12.36a20.56 20.56 0 0 1 5.31 13.33l-.33 14.2a4 4 0 0 1 2.93 2.92c.43 1.74 0 4.12-1.52 7.48 0 .11-.11.11-.11.22L82.63 60.7c-1.4 2.3-2.85 4.65-4.48 6.81-1.93 2.58-3.52 2.12-1.87 4.59 11.83 16.26 46.6 6 46.6 38.34H0C0 78.08 34.78 88.36 46.6 72.1c1.36-2 1-1.85-.53-3.48Z"/></svg>`;
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
    template.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="interactive-avatar-container absolute-position">
					<div class="ruizam-avatar">
						<div class="dialog-bubble-wrapper">
							<div class="dialog-bubble">
								<span class="comic-dialog">${this.comicDialogText}</span>
							</div>
						</div>
						${this.theAvatarSvg}
					<div class="ruizam-avatar__header">
						<a href="/">
							<h1 class="ruizam-avatar__header-title">${this.headerTitle}</h1>
							<h2 class="ruizam-avatar__header-subtitle">&nbsp;&nbsp;${this.headerSubtitle}</h2>
						</a>
					</div>
				</div>
    `;
    return template;
  }

  private getStyles(): string {
    return `
      /* Avatar styles */
	.absolute-position {
		position: absolute;
	}
	.interactive-avatar-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1%;
		top: 7%;
		left: 50%;
		width: 100%;
		transform: translateX(-50%);
		z-index: 4;
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

	.dialog-bubble-wrapper {
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

	.dialog-bubble-wrapper.active {
		animation: showDialog 400ms forwards ease-out;
		pointer-events: auto;
	}

	.dialog-bubble-wrapper.hide {
		animation: hideDialog 300ms forwards ease-in;
	}

	.dialog-bubble {
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

	.comic-dialog {
		display: inline-block;
		width: 85%;
	}

	.ruizam-avatar {
		position: relative;
		width: 120px;
		height: fit-content;
	}
	.ruizam-avatar__image {
		width: 100%;
		object-fit: cover;
		transition: transform 500ms;
		cursor: pointer
	}
	.ruizam-avatar__header {
		font-weight: 400;
		font-style: normal;
	}
	.ruizam-avatar__header a {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.ruizam-avatar__header-title {
		font-family: var(--font-heading);
		font-size: 7rem;
		line-height: 85%;
	}
	.ruizam-avatar__header-subtitle {
		font-size: 3rem;
		font-family: var(--font-body);
		font-weight: 300;
		font-style: normal;
	}
	.ruizam-avatar__header-description {
		font-size: 2.4rem;
	}
    @media (hover: hover) {
		.ruizam-avatar:hover .ruizam-avatar__image {
			transform: scale(1.2);
		}
	}
	@media (max-width: 1920px) {
		.ruizam-avatar {
			width: 100px;
		}
		.ruizam-avatar__header-title {
			font-size: 6rem;
		}
		.ruizam-avatar__header-subtitle {
			font-size: 2.7rem;
		}
	}
	@media (max-width: 1440px) {
		.ruizam-avatar {
			width: 96px;
		}
		.ruizam-avatar__header-title {
			font-size: 5.8rem;
		}
		.ruizam-avatar__header-subtitle {
			font-size: 2.6rem;
		}
	}
	
	@media (max-width: 1366px) {
		.ruizam-avatar {
			width: 94px;
		}
		.dialog-bubble-wrapper {
			left: -70%;
			font-size: 1.3rem;
		}
		.dialog-bubble {
			width: 100px;
		}
		.ruizam-avatar__header-title {
			font-size: 5.6rem;
		}
		.ruizam-avatar__header-subtitle {
			font-size: 2.5rem;
		}
	}

	@media (max-width: 1280px) {
		.ruizam-avatar {
			width: 92px;
		}
		.ruizam-avatar__header-title {
			font-size: 5.4rem;
		}
		.ruizam-avatar__header-subtitle {
			font-size: 2.4rem;
		}
	}
	@media (max-width: 1024px) {
		.ruizam-avatar {
			width: 90px;
		}
		.ruizam-avatar__header-title {
			font-size: 5.2rem;
		}
		.ruizam-avatar__header-subtitle {
			font-size: 2.3rem;
		}
	}

	@media (max-width: 900px) {
		.ruizam-avatar {
			width: 88px;
		}
		.ruizam-avatar__header-title {
			font-size: 5rem;
		}
		.ruizam-avatar__header-subtitle {
			font-size: 2.2rem;
		}
	}

	@media (max-width: 768px) {
		
		.ruizam-avatar {
			width: 86px;
		}
		.dialog-bubble-wrapper {
			top: -30px;
			left: -55%;
			font-size: 1.2rem;
		}
		.dialog-bubble {
			width: 90px;
		}
		.ruizam-avatar__header {
			display: flex;
			flex-direction: column;
		}
		.ruizam-avatar__header-title {
			font-size: 4.8rem;
		}
		.ruizam-avatar__header-subtitle {
			font-size: 2.1rem;
		}
		.ruizam-avatar__header-description {
			font-size: 2rem;
		}
	} 
	@media (orientation: landscape) and (max-height: 600px) {
		
	}
	@media (max-width: 600px) {
		.interactive-avatar-container {
			top: 10%;
		}
		.ruizam-avatar {
			width: 75px;
		}
		.ruizam-avatar__header-title {
			font-size: 4.5rem;
		}
		.ruizam-avatar__header-subtitle {
			font-size: 2.1rem;
		}
	}
	@media (max-width: 480px) {
		.interactive-avatar-container {
			top: 14%;
		}
		.ruizam-avatar {
			width: 68px;
		}
		.dialog-bubble-wrapper {
			top: -50px;
			left: -30%;
			font-size: 1rem;
		}
		.dialog-bubble {
			width: 75px;
		}
		.ruizam-avatar__header-title {
			font-size: 4.2rem;
		}
		.ruizam-avatar__header-subtitle {
			font-size: 1.8rem;
			letter-spacing: 1px;
		}
	}
	@media (max-width: 430px) {
		.ruizam-avatar {
			width: 60px;
		}
		.ruizam-avatar__header-title {
			font-size: 3.7rem;
		}
		.ruizam-avatar__header-subtitle {
			font-size: 1.6rem;
			letter-spacing: 1px;
		}
	}
    `;
  }

  private attachEvents(): void {
    // Agrega listeners aquí si necesitas
    const ruizamAvatar = document.querySelector('.ruizam-avatar');
	const dialogBubbleWrapper = document.querySelector('.dialog-bubble-wrapper');

	if (ruizamAvatar && dialogBubbleWrapper) {
		ruizamAvatar.addEventListener('click', () => {
			// Evita múltiples clics locos
			dialogBubbleWrapper.classList.remove('hide');
			dialogBubbleWrapper.classList.add('active');

			// Después de 3 segundos se oculta con animación
			setTimeout(() => {
				dialogBubbleWrapper.classList.remove('active');
				dialogBubbleWrapper.classList.add('hide');
			}, 3000);
		});
	}

  }

  private removeEvents(): void {
    // Limpia listeners aquí
  }
}

if (!customElements.get('ruizam-header')) {
  customElements.define('ruizam-header', RuizamHeader);
}

export default RuizamHeader;
