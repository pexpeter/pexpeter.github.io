  // Smooth scrolling
  document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav a');

    for (const link of links) {
      link.addEventListener('click', smoothScroll);
    }

    function smoothScroll(event) {
      event.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });

const navbar = document.querySelector('.navbar');
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarMenu = document.querySelector('.navbar-menu');

navbar.addEventListener('mouseover', function () {
    navbarMenu.classList.add('active');
});

navbar.addEventListener('mouseout', function () {
    navbarMenu.classList.remove('active');
});

navbarToggler.addEventListener('click', function () {
    navbarMenu.classList.toggle('active');
});

