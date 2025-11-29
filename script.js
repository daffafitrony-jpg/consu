document.addEventListener('DOMContentLoaded', () => {

    // ==== HAMBURGER MENU ====
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==== SCROLL REVEAL ANIMATION ====
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    // ==== NIGHT MODE ====
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const moonIcon = '<i class="fas fa-moon"></i>';
    const sunIcon = '<i class="fas fa-sun"></i>';

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if (darkModeToggle) darkModeToggle.innerHTML = sunIcon;
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            if (darkModeToggle) darkModeToggle.innerHTML = moonIcon;
            localStorage.setItem('theme', 'light');
        }
    }

    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default Dark
    applyTheme(savedTheme);

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            applyTheme(localStorage.getItem('theme') === 'dark' ? 'light' : 'dark');
        });
    }
});

// ==== GALERI LOGIC (GLOBAL) ====
function scrollGallery(direction) {
    const container = document.getElementById('galleryContainer');
    if (container) {
        const scrollAmount = 300;
        container.scrollLeft += (direction * scrollAmount);
    }
}

function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if (lightbox && lightboxImg) {
        lightbox.style.display = "flex";
        lightbox.style.alignItems = "center";
        lightbox.style.justifyContent = "center";
        lightboxImg.src = imgElement.src;
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.style.display = "none";
}