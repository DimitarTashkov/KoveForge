/**
 * KoveForge Theme Manager
 * Sets default theme to light, allows toggling to dark, and saves preference in localStorage.
 */

(function() {
  // Check local storage for theme preference
  const savedTheme = localStorage.getItem('koveforge-theme');
  
  // Set initial theme before page load to prevent flash
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-theme');
  } else {
    document.documentElement.classList.remove('dark-theme');
  }

  // Once DOM is loaded, attach event listeners to toggle buttons
  document.addEventListener('DOMContentLoaded', () => {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    
    // Update button icons based on current state
    const updateIcons = () => {
      const isDark = document.documentElement.classList.contains('dark-theme');
      themeToggles.forEach(toggle => {
        if (isDark) {
          toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg><span class="sr-only">Смени на светла тема</span>';
        } else {
          toggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg><span class="sr-only">Смени на тъмна тема</span>';
        }
      });
    };

    updateIcons();

    themeToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark-theme');
        const isDark = document.documentElement.classList.contains('dark-theme');
        localStorage.setItem('koveforge-theme', isDark ? 'dark' : 'light');
        updateIcons();
      });
    });
  });
})();
