// blogTransition.ts

// Se definen todos los elementos que se relacionan con la animación
const navbar = document.querySelector('website-navbar');
const header = document.querySelector('website-header');
const blogButton = navbar?.shadowRoot?.querySelector('.Book-open');
const homeButton = navbar?.shadowRoot?.querySelector('.Home')
const websiteHeader = header?.shadowRoot?.querySelector('.website-header__content-wrapper')
const websiteHeaderAvatar = header?.shadowRoot?.querySelector('.website-header__avatar')
const websiteHeaderTitles = header?.shadowRoot?.querySelector('.website-header__titles') as HTMLElement;
const mainContent = document.querySelector('blog-carousel') as HTMLElement;
const mainSection = document.querySelector('.main-section') as HTMLElement;
const originalNavbar = document.querySelector('website-navbar') as HTMLElement;

if (originalNavbar) {
  // Clonamos el nodo
  const navbarClone = originalNavbar.cloneNode(true) as HTMLElement;

  // Le agregamos la clase
  navbarClone.classList.add('navbar-clone');

  // Lo insertamos dentro de main-section
  mainSection?.appendChild(navbarClone)

  blogButton?.addEventListener('click', () => {
    console.log('Blog Button Clicked!')
    if (blogButton && websiteHeaderTitles && mainContent && mainSection && originalNavbar && navbarClone) {
      // Paso 1: Desvanencer el header y contenido principal
      websiteHeaderTitles.classList.add('fade-out');
      mainContent.classList.add('fade-out');
    
      // Paso 2: Mover el main-section a la izquierda
      mainSection.classList.add('slide-left');
    
      // Paso 3: Mover el navbar original hacia la derecha
      originalNavbar.classList.add('slide-right');

      setTimeout(() => {
        navbarClone.setAttribute('style', 'display: block;');
        websiteHeaderAvatar?.classList.add('avatar-transition');
        websiteHeader?.classList.add('wh-transition');
      }, 500)
      
      // Paso 4: Mostrar el navbar clonado después de un pequeño delay
      setTimeout(() => {
        navbarClone.classList.add('visible')
      }, 500);
    };
  });

  homeButton?.addEventListener('click', () => {

  })
}

