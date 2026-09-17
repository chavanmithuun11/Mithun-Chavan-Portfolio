/* =========================================================
   MITHUN CHAVAN PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const header = document.getElementById("siteHeader");
    const progress = document.getElementById("scrollProgress");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-link");

    const revealElements =
        document.querySelectorAll(".reveal");

    const tiltCards =
        document.querySelectorAll("[data-tilt]");

    const threeDCards =
        document.querySelectorAll("[data-3d]");

    const copyButton =
        document.getElementById("copyEmail");

    const copyMessage =
        document.getElementById("copyMessage");

    const marqueeTrack =
        document.getElementById("marqueeTrack");


    /* =====================================================
       REDUCED MOTION CHECK
    ====================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* =====================================================
       TECHNOLOGY MARQUEE
    ====================================================== */

    if (marqueeTrack) {

        const technologies = [
            "C#",
            ".NET",
            "ASP.NET CORE",
            "MVC",
            "ENTITY FRAMEWORK CORE",
            "SQL SERVER",
            "SQLITE",
            "HTML",
            "CSS",
            "JAVASCRIPT",
            "RAZOR",
            "GIT",
            "GITHUB",
            "VS CODE"
        ];


        function createMarqueeItems() {

            return technologies
                .map((technology) => {

                    return `
                        <div class="marquee-item">
                            <span>${technology}</span>
                            <span class="marquee-dot"></span>
                        </div>
                    `;

                })
                .join("");

        }


        /*
         * Duplicate the content so the
         * marquee can loop continuously.
         */

        const marqueeContent =
            createMarqueeItems();

        marqueeTrack.innerHTML =
            marqueeContent +
            marqueeContent;
    }


    /* =====================================================
       HEADER SCROLL EFFECT
    ====================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 20) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }
    }


    /* =====================================================
       SCROLL PROGRESS BAR
    ====================================================== */

    function updateScrollProgress() {

        if (!progress) return;

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight;

        const windowHeight =
            window.innerHeight;

        const scrollable =
            documentHeight - windowHeight;

        if (scrollable <= 0) {

            progress.style.width = "0%";

            return;
        }

        const percentage =
            (scrollTop / scrollable) * 100;

        progress.style.width =
            `${percentage}%`;
    }


    /* =====================================================
       SCROLL ANIMATION
    ====================================================== */

    if (!prefersReducedMotion) {

        const revealObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("in");

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -60px 0px"
                }
            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("in");

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    if (sections.length && navItems.length) {

        const sectionObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const currentId =
                            entry.target.getAttribute("id");


                        navItems.forEach((link) => {

                            link.classList.remove(
                                "active"
                            );

                            const href =
                                link.getAttribute("href");


                            if (
                                href ===
                                `#${currentId}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    });

                },
                {
                    threshold: 0.25,
                    rootMargin:
                        "-20% 0px -55% 0px"
                }
            );


        sections.forEach((section) => {

            sectionObserver.observe(section);

        });

    }


    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    if (menuToggle && navLinks) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navLinks.classList.toggle(
                        "open"
                    );


                menuToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );


        navItems.forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });


        document.addEventListener(
            "click",
            (event) => {

                const clickedInsideMenu =
                    navLinks.contains(
                        event.target
                    );

                const clickedToggle =
                    menuToggle.contains(
                        event.target
                    );


                if (
                    !clickedInsideMenu &&
                    !clickedToggle
                ) {

                    navLinks.classList.remove(
                        "open"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    }


    /* =====================================================
       3D SKILL CARD TILT
    ====================================================== */

    if (!prefersReducedMotion) {

        tiltCards.forEach((card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;

                    const centerY =
                        rect.height / 2;


                    const rotateY =
                        ((x - centerX) /
                            centerX) * 7;

                    const rotateX =
                        ((centerY - y) /
                            centerY) * 7;


                    card.style.setProperty(
                        "--mouse-x",
                        `${x}px`
                    );

                    card.style.setProperty(
                        "--mouse-y",
                        `${y}px`
                    );


                    card.style.transform =
                        `
                        perspective(1000px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateZ(8px)
                        scale(1.015)
                        `;
                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        `
                        perspective(1000px)
                        rotateX(0deg)
                        rotateY(0deg)
                        translateZ(0)
                        scale(1)
                        `;

                }
            );

        });

    }


    /* =====================================================
       PROJECT / SECTION 3D SCROLL EFFECT
    ====================================================== */

    function update3DElements() {

        if (prefersReducedMotion) {
            return;
        }


        const viewportHeight =
            window.innerHeight;


        threeDCards.forEach((element) => {

            const rect =
                element.getBoundingClientRect();


            /*
             * Distance from the center
             * of the viewport.
             */

            const elementCenter =
                rect.top +
                rect.height / 2;


            const viewportCenter =
                viewportHeight / 2;


            const distance =
                elementCenter -
                viewportCenter;


            /*
             * Keep effect subtle.
             */

            const normalized =
                Math.max(
                    -1,
                    Math.min(
                        1,
                        distance /
                        viewportHeight
                    )
                );


            const rotateX =
                normalized * -3;


            const translateZ =
                (1 - Math.abs(normalized)) * 10;


            if (
                !element.matches(
                    ":hover"
                )
            ) {

                element.style.transform =
                    `
                    perspective(1400px)
                    rotateX(${rotateX}deg)
                    translateZ(${translateZ}px)
                    `;

            }

        });

    }


    /* =====================================================
       HERO PARALLAX
    ====================================================== */

    const hero =
        document.querySelector(".hero");

    const heroAvatar =
        document.querySelector(
            ".hero-avatar"
        );


    if (
        hero &&
        heroAvatar &&
        !prefersReducedMotion
    ) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    hero.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const moveX =
                    (x - centerX) * 0.018;

                const moveY =
                    (y - centerY) * 0.012;


                heroAvatar.style.marginLeft =
                    `${moveX}px`;

                heroAvatar.style.marginTop =
                    `${moveY}px`;

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                heroAvatar.style.marginLeft =
                    "0px";

                heroAvatar.style.marginTop =
                    "0px";

            }
        );

    }


    /* =====================================================
       MAGNETIC BUTTONS
    ====================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".magnetic"
        );


    if (!prefersReducedMotion) {

        magneticButtons.forEach((button) => {

            button.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        button.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    button.style.transform =
                        `
                        translate(
                            ${x * 0.15}px,
                            ${y * 0.15}px
                        )
                        `;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "";

                }
            );

        });

    }


    /* =====================================================
       COPY EMAIL
    ====================================================== */

    if (copyButton) {

        copyButton.addEventListener(
            "click",
            async () => {

                const email =
                    "chavanmithun826@gmail.com";


                try {

                    await navigator.clipboard.writeText(
                        email
                    );


                    if (copyMessage) {

                        copyMessage.textContent =
                            "Email copied successfully.";

                    }


                    copyButton.textContent =
                        "Copied ✓";


                    setTimeout(
                        () => {

                            copyButton.textContent =
                                "Copy Email";

                            if (copyMessage) {

                                copyMessage.textContent =
                                    "";

                            }

                        },
                        2200
                    );


                } catch (error) {

                    /*
                     * Fallback for browsers
                     * where Clipboard API
                     * isn't available.
                     */

                    const textArea =
                        document.createElement(
                            "textarea"
                        );

                    textArea.value =
                        email;

                    textArea.style.position =
                        "fixed";

                    textArea.style.opacity =
                        "0";

                    document.body.appendChild(
                        textArea
                    );

                    textArea.focus();

                    textArea.select();

                    document.execCommand(
                        "copy"
                    );

                    textArea.remove();


                    if (copyMessage) {

                        copyMessage.textContent =
                            "Email copied successfully.";

                    }

                }

            }
        );

    }


    /* =====================================================
       SMOOTH ANCHOR FALLBACK
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior:
                            prefersReducedMotion
                                ? "auto"
                                : "smooth"
                    });

                }
            );

        });


    /* =====================================================
       SCROLL EVENT
    ====================================================== */

    let ticking = false;


    function handleScroll() {

        if (!ticking) {

            window.requestAnimationFrame(
                () => {

                    updateHeader();

                    updateScrollProgress();

                    update3DElements();

                    ticking = false;

                }
            );

            ticking = true;

        }

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    /* =====================================================
       RESIZE
    ====================================================== */

    window.addEventListener(
        "resize",
        () => {

            updateHeader();

            updateScrollProgress();

        }
    );


    /* =====================================================
       INITIAL STATE
    ====================================================== */

    updateHeader();

    updateScrollProgress();

    if (prefersReducedMotion) {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "in"
                );

            }
        );

    }

});