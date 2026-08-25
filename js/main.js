const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuToggle.innerHTML = "✕";
    } else {
        menuToggle.innerHTML = "☰";
    }
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.innerHTML = "☰";
    });
});

/* ==================================================
   DIGITAL PAGE — INTERACTIONS V2
================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const digitalPage = document.querySelector(".digital-page");
    if (!digitalPage) return;


    /* =========================
       FEATURED CARDS — 3D TILT
    ========================= */

    const cards = document.querySelectorAll(".digital-feature-card");

    cards.forEach(card => {

        card.addEventListener("mousemove", e => {

            if (window.innerWidth <= 760) return;

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 7;
            const rotateX = -((y - centerY) / centerY) * 7;

            card.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)
                 scale(1.02)`;
        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)";

        });

    });


    /* =========================
       HERO PROJECT PARALLAX
    ========================= */

    const hero = document.querySelector(".digital-hero-visual");

    if (hero && window.innerWidth > 760) {

        hero.addEventListener("mousemove", e => {

            const rect = hero.getBoundingClientRect();

            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const main = hero.querySelector(".digital-preview-main");
            const secondary = hero.querySelector(".digital-preview-secondary");
            const tertiary = hero.querySelector(".digital-preview-tertiary");

            if (main) {
                main.style.transform =
                    `translate(${x * 12}px, ${y * 10}px) rotate(-4deg)`;
            }

            if (secondary) {
                secondary.style.transform =
                    `translate(${x * -18}px, ${y * -14}px) rotate(4deg)`;
            }

            if (tertiary) {
                tertiary.style.transform =
                    `translate(${x * 22}px, ${y * 16}px) rotate(-2deg)`;
            }

        });


        hero.addEventListener("mouseleave", () => {

            const main = hero.querySelector(".digital-preview-main");
            const secondary = hero.querySelector(".digital-preview-secondary");
            const tertiary = hero.querySelector(".digital-preview-tertiary");

            if (main)
                main.style.transform = "rotate(-4deg)";

            if (secondary)
                secondary.style.transform = "rotate(4deg)";

            if (tertiary)
                tertiary.style.transform = "rotate(-2deg)";
        });

    }


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealItems = document.querySelectorAll(
        ".digital-capability-grid article, " +
        ".digital-process-step, " +
        ".digital-feature-card, " +
        ".digital-other-list > div"
    );

    revealItems.forEach((item, index) => {

        item.classList.add("digital-reveal");

        item.style.transitionDelay =
            `${Math.min(index % 4, 3) * 90}ms`;
    });


    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.18
    });


    revealItems.forEach(item => observer.observe(item));

});