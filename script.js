// Kita bungkus semua skrip di dalam satu 'DOMContentLoaded'
// Ini memastikan HTML selesai dimuat sebelum skrip berjalan
document.addEventListener('DOMContentLoaded', () => {

    // ==== 1. KODE UNTUK HAMBURGER MENU ====
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });


    // ==== 2. MENUTUP MENU MOBILE SETELAH LINK DIKLIK ====
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                hamburgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });


    // ==== 3. KODE UNTUK ANIMASI SAAT SCROLL (REVEAL) ====
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    revealElements.forEach(el => {
        scrollObserver.observe(el);
    });


    // ==== 4. KODE UNTUK NIGHT MODE ====
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    // Ikon untuk tombol
    const moonIcon = '<i class="fas fa-moon"></i>';
    const sunIcon = '<i class="fas fa-sun"></i>';

    // Fungsi untuk menerapkan tema
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            // Cek dulu apakah tombolnya ada
            if(darkModeToggle) {
                darkModeToggle.innerHTML = sunIcon; // Tampilkan ikon matahari
            }
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            // Cek dulu apakah tombolnya ada
            if(darkModeToggle) {
                darkModeToggle.innerHTML = moonIcon; // Tampilkan ikon bulan
            }
            localStorage.setItem('theme', 'light');
        }
    }

    // Cek tema yang tersimpan di localStorage saat halaman dimuat
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // Tambahkan event listener untuk tombol toggle (jika tombolnya ada)
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const currentTheme = localStorage.getItem('theme');
            
            if (currentTheme === 'dark') {
                applyTheme('light');
            } else {
                applyTheme('dark');
            }
        });
    }

}); // Penutup 'DOMContentLoaded'