document.addEventListener('DOMContentLoaded', () => {
    // --- Dark Mode Logic ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const starIcon = document.getElementById('star-icon');

    // Function to visually swap the icons
    const updateIcon = (isDark) => {
        if (!sunIcon || !starIcon) return; // Prevent errors if icons are missing
        if (isDark) {
            sunIcon.classList.add('hidden');
            starIcon.classList.remove('hidden');
        } else {
            sunIcon.classList.remove('hidden');
            starIcon.classList.add('hidden');
        }
    };

    // Initialize Theme on Load
    const initializeTheme = () => {
        const isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        updateIcon(isDark);
    };

    // Run initialization immediately
    initializeTheme();

    // Toggle Button Event Listener
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.theme = isDark ? 'dark' : 'light';
            updateIcon(isDark);
        });
    }

    // --- Sidebar Logic ---
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-sidebar');

    const toggleSidebar = () => {
        if (sidebar) sidebar.classList.toggle('hidden');
    };

    if (menuBtn) menuBtn.addEventListener('click', toggleSidebar);
    if (closeBtn) closeBtn.addEventListener('click', toggleSidebar);
    
    // Close sidebar when clicking the dark overlay
    if (sidebar) {
        sidebar.addEventListener('click', (e) => {
            if (e.target === sidebar) toggleSidebar();
        });
    }

    // --- Scroll to Top Logic ---
    const scrollBtn = document.getElementById('scroll-top-btn');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.remove('hidden');
            } else {
                scrollBtn.classList.add('hidden');
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
