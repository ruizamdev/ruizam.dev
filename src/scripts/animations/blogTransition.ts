// blogTransition.ts

// Se definen todos los elementos que se relacionan con la animación
const navbar = document.querySelector('website-navbar');
const header = document.querySelector('website-header');
const blogButton = navbar?.shadowRoot?.querySelector('.Book-open');
const websiteHeader = header?.shadowRoot?.querySelector('.website-header__content-wrapper');
const websiteHeaderAvatar = header?.shadowRoot?.querySelector('.website-header__avatar');
const websiteHeaderTitles = header?.shadowRoot?.querySelector('.website-header__titles') as HTMLElement;
const mainContent = document.querySelector('blog-carousel') as HTMLElement;
const mainSection = document.querySelector('.main-section') as HTMLElement;
const originalNavbar = document.querySelector('website-navbar') as HTMLElement;

let currentNavbarClone: HTMLElement | null = null;

function waitForShadowRootAndAttach(navbarClone: HTMLElement) {
  const tryAttach = () => {
    const clonedHomeButton = navbarClone.shadowRoot?.querySelector('.Home');
    if (clonedHomeButton) {
      clonedHomeButton.addEventListener('click', () => {
        console.log('Clon Home button click');

        navbarClone.classList.remove('visible');
        websiteHeaderTitles.classList.remove('fade-out');
        mainContent.classList.remove('fade-out');
        mainSection.classList.remove('slide-left');
        originalNavbar.classList.remove('slide-right');
        websiteHeaderAvatar?.classList.remove('avatar-transition');
        header?.classList.remove('header-transition');

        void websiteHeaderTitles.offsetWidth;
        void mainContent.offsetWidth;

        setTimeout(() => {
          navbarClone.setAttribute('style', 'display: none;');
        }, 500);
      }, { once: true });
    } else {
      requestAnimationFrame(tryAttach);
    }
  };
  tryAttach();
}

// Listener para el botón de Blog
blogButton?.addEventListener('click', () => {
  if (blogButton && websiteHeaderTitles && mainContent && mainSection && originalNavbar) {
    // Eliminar el clon anterior si existe
    if (currentNavbarClone) {
      currentNavbarClone.remove();
      currentNavbarClone = null;
    }

    // Crear nuevo clon limpio
    const navbarClone = document.createElement('website-navbar') as HTMLElement;
    navbarClone.classList.add('navbar-clone');
    navbarClone.setAttribute('style', 'display: none;');
    mainSection?.appendChild(navbarClone);
    currentNavbarClone = navbarClone;

    websiteHeaderTitles.classList.add('fade-out');
    mainContent.classList.add('fade-out');
    header?.classList.add('header-transition');

    mainSection.classList.add('slide-left');
    originalNavbar.classList.add('slide-right');

    setTimeout(() => {
      navbarClone.setAttribute('style', 'display: block;');
      websiteHeaderAvatar?.classList.add('avatar-transition');
      navbarClone.classList.add('visible');
      waitForShadowRootAndAttach(navbarClone);
    }, 500);
  }
});
