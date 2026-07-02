document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Logic
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-sidebar');

    const toggleSidebar = () => sidebar.classList.toggle('hidden');

    menuBtn.addEventListener('click', toggleSidebar);
    closeBtn.addEventListener('click', toggleSidebar);
    
    // Close sidebar when clicking outside the menu (on the overlay)
    sidebar.addEventListener('click', (e) => {
        if (e.target === sidebar) toggleSidebar();
    });

    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    });

    // Scroll to Top
    const scrollBtn = document.getElementById('scroll-top-btn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) scrollBtn.classList.remove('hidden');
        else scrollBtn.classList.add('hidden');
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});