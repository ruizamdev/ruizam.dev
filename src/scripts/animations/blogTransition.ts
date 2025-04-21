const navbar = document.querySelector('website-navbar') as HTMLElement;
console.log('navbar:', navbar);

const header = document.querySelector('website-header') as HTMLElement;
console.log('header:', header);

const mainAside = document.querySelector(".main-aside") as HTMLElement;

const themeToggle = document.querySelector('theme-toggle') as HTMLElement;

const websiteHeader = header.shadowRoot?.querySelector('.website-header') as HTMLElement;
console.log('websiteHeader:', websiteHeader);

const websiteHeaderAvatarWrapper = header.shadowRoot?.querySelector('website-header__avatar-wrapper') as HTMLElement;

const websiteHeaderAvatar = header.shadowRoot?.querySelector('.website-header__avatar') as HTMLElement;

const websiteHeaderTitles = header.shadowRoot?.querySelector('.website-header__titles') as HTMLElement;
console.log('websiteHeaderTitles:', websiteHeaderTitles);

const blogCarousel = document.querySelector('blog-carousel') as HTMLElement;
console.log('blogCarousel:', blogCarousel);

const mainSection = document.querySelector('.main-section') as HTMLElement;
console.log('mainSection:', mainSection);

const originalNavbar = document.querySelector('website-navbar') as HTMLElement;
console.log('originalNavbar:', originalNavbar);


navbar.addEventListener('blog-clicked', () => {
  websiteHeaderTitles.classList.add('fade-out-titles');
  setTimeout(() => {
    websiteHeaderTitles.style.display = 'none';
  }, 250);
  blogCarousel.classList.add('fade-out');
  mainSection.classList.add('slide-left');
  websiteHeaderAvatar.classList.add('avatar-transition');
  
  header.classList.add('header-transition');
  
  mainAside.classList.add('slide-right');
  const secondNavbar = document.createElement('website-navbar') as HTMLElement;
  secondNavbar.classList.add('second-navbar');
  setTimeout(() => {
    mainSection.appendChild(secondNavbar);
  }, 650);
  setTimeout(() => {
  secondNavbar.classList.add('appears')
  }, 100);

  // home button click event
  secondNavbar.addEventListener('home-clicked', () => {
    secondNavbar.classList.remove('appears');
    setTimeout(() => {
      secondNavbar.remove();
    }, 700);
    mainAside.classList.remove('slide-right');
    header.classList.remove('header-transition');
    blogCarousel.classList.remove('fade-out');
  mainSection.classList.remove('slide-left');
  websiteHeaderAvatar.classList.remove('avatar-transition');
  websiteHeaderTitles.style.display = 'block';
  websiteHeaderTitles.classList.remove('fade-out-titles');
  });
});

