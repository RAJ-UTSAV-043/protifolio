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
        if (!sidebar) return;
        const isHidden = sidebar.classList.toggle('hidden');
        sidebar.setAttribute('aria-hidden', isHidden ? 'true' : 'false');
    };

    if (menuBtn) menuBtn.addEventListener('click', toggleSidebar);
    if (closeBtn) closeBtn.addEventListener('click', toggleSidebar);
    
    // Close sidebar when clicking the dark overlay
    if (sidebar) {
        sidebar.addEventListener('click', (e) => {
            if (e.target === sidebar) toggleSidebar();
        });
        
        // NEW: Close sidebar automatically when any link inside it is clicked
        const sidebarLinks = sidebar.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.add('hidden');
            });
        });
    }
    
    // --- Contact Form Submission Logic ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.textContent = "Thanks! Your message has been sent — I'll get back to you soon.";
                    formStatus.classList.remove('hidden', 'text-red-600');
                    formStatus.classList.add('text-green-600');
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (err) {
                formStatus.textContent = "Something went wrong sending your message. Please email me directly instead.";
                formStatus.classList.remove('hidden', 'text-green-600');
                formStatus.classList.add('text-red-600');
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
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

// --- Loader Logic ---
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (!loader) return;

    // Only play the full intro animation once per browser session so repeat
    // visitors (e.g. clicking between sections) aren't stuck waiting again.
    const hasSeenIntro = sessionStorage.getItem("introSeen");
    const delay = hasSeenIntro ? 300 : 2000;

    setTimeout(() => {
        loader.classList.add("loader-hidden");
        document.body.classList.remove("loading");
        sessionStorage.setItem("introSeen", "true");
    }, delay);
});
// --- Scroll Reveal Animation Logic ---
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15, // Triggers when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Ensures it only animates once
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});