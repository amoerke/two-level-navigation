document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const menuOverlay = document.querySelector('.menu-overlay');
  const darkOverlay = document.querySelector('.dark-overlay');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link[data-submenu]');
  const backButtons = document.querySelectorAll('.back-button');
  const isMobile = () => window.innerWidth < 885;
  
  // Toggle main menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    
    // Toggle dark overlay only in desktop view
    if (!isMobile()) {
      darkOverlay.classList.toggle('active');
    }
    
    // Only prevent scroll on mobile
    if (isMobile()) {
      document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
    }
    
    // Reset any open submenus when closing main menu (mobile only)
    if (isMobile()) {
      document.querySelectorAll('.submenu-mobile.active').forEach(submenu => {
        submenu.classList.remove('active');
      });
      menuOverlay.classList.remove('submenu-active');
    }
  });

  // Mobile-only event listeners
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (isMobile()) {
        e.preventDefault();
        const submenuId = `${link.dataset.submenu}-submenu`;
        const submenu = document.getElementById(submenuId);
        if (submenu) {
          submenu.classList.add('active');
          menuOverlay.classList.add('submenu-active');
        }
      }
    });
  });

  // Close submenu
  backButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      if (isMobile()) {
        e.preventDefault();
        const submenu = button.closest('.submenu-mobile');
        if (submenu) {
          submenu.classList.remove('active');
          menuOverlay.classList.remove('submenu-active');
        }
      }
    });
  });

  // Handle resize events
  window.addEventListener('resize', () => {
    if (!isMobile()) {
      document.body.style.overflow = ''; // Reset overflow when switching to desktop
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!isMobile()) {
      if (!menuOverlay.contains(e.target) && !hamburger.contains(e.target)) {
        menuOverlay.classList.remove('active');
        hamburger.classList.remove('active');
        darkOverlay.classList.remove('active');
      }
    }
  });

  // Close menu when clicking on dark overlay
  darkOverlay.addEventListener('click', () => {
    if (!isMobile()) {
      menuOverlay.classList.remove('active');
      hamburger.classList.remove('active');
      darkOverlay.classList.remove('active');
    }
  });
});
