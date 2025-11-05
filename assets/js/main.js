document.addEventListener("DOMContentLoaded", () => {

    /**
     * FEATURE 1: Preloader
     * --------------------------------------
     * Fades out the preloader once the window is fully loaded.
     */
    const preloader = document.getElementById("preloader");
    window.addEventListener("load", () => {
        if (preloader) {
            document.body.classList.add("loaded");
            // Wait for fade out animation to finish before hiding
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500);
        }
    });

    /**
     * FEATURE 2: Frosted Navbar Scroll Effect
     * --------------------------------------
     * Adds a 'scrolled' class to the navbar when the page is scrolled down.
     */
    const navbar = document.getElementById("mainNavbar");
    if (navbar) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        };
        // Run on load
        handleScroll();
        // Run on scroll
        window.addEventListener("scroll", handleScroll);
    }

    /**
     * FEATURE 3: Active Navigation Link Highlighting
     * ----------------------------------------------
     * Automatically adds an 'active' class to the nav link
     * that matches the current page.
     */
    const currentPage = window.location.pathname.split('/').pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    /**
     * FEATURE 4: Scroll-Triggered Animations
     * --------------------------------------
     * Uses IntersectionObserver to add a 'is-visible' class
     * to elements when they enter the viewport.
     */
    const scrollElements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    scrollElements.forEach(el => {
        observer.observe(el);
    });

    /**
     * FEATURE 5: Parallax Image Effect
     * --------------------------------
     * Uses a 'scroll' event listener to move images
     * at a different speed than the page.
     */
    const parallaxImages = document.querySelectorAll(".parallax-image");
    const parallaxSpeed = 0.2; // How slow the image moves

    function applyParallax() {
        const viewportTop = window.scrollY;
        const viewportHeight = window.innerHeight;

        parallaxImages.forEach(img => {
            // Check if parentElement exists before getting bounding rect
            if (img.parentElement) {
                const rect = img.parentElement.getBoundingClientRect();
                const elementTop = rect.top + viewportTop;
                const elementHeight = rect.height;

                // Check if element is roughly in viewport
                if ((elementTop + elementHeight) > viewportTop && elementTop < (viewportTop + viewportHeight)) {
                    // Calculate progress (0 at bottom of viewport, 1 at top)
                    const progress = (viewportTop + viewportHeight - elementTop) / (viewportHeight + elementHeight);
                    // Apply a non-linear transform for a smoother effect
                    const yOffset = (progress - 0.5) * elementHeight * parallaxSpeed * 2; 
                    
                    img.style.transform = `translateY(${yOffset}px)`;
                }
            }
        });
    }

    window.addEventListener("scroll", applyParallax);
    applyParallax(); // Run once on load

    /**
     * FEATURE 6: Dynamic Copyright Year
     * ---------------------------------
     * Automatically updates the year in the footer.
     */
     const yearSpan = document.getElementById("current-year");
     if (yearSpan) {
         yearSpan.textContent = new Date().getFullYear();
     }

    /**
     * FEATURE 7: Initialize Bootstrap Carousels
     * ---------------------------------
     * Finds all carousels and initializes them.
     */
    const productCarouselEl = document.querySelector("#productCarousel");
    if (productCarouselEl) {
        new bootstrap.Carousel(productCarouselEl, {
            interval: 5000, // 5 seconds
            ride: 'carousel'
        });
    }

    const testimonialCarouselEl = document.querySelector("#testimonialCarousel");
    if (testimonialCarouselEl) {
        new bootstrap.Carousel(testimonialCarouselEl, {
            interval: 6000, // 6 seconds
            ride: 'carousel'
        });
    }

    const productImageCarouselEl = document.querySelector("#productImageCarousel");
    if (productImageCarouselEl) {
        new bootstrap.Carousel(productImageCarouselEl, {
            interval: 4000, // 4 seconds
            ride: 'carousel'
        });
    }

});