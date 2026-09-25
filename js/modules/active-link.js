

export function initActiveLink() {
    const links = document.querySelectorAll("#navbar-menu .navbar__link");

    if (!links.length || !("IntersectionObserver" in window)) return;

    const linkBySection = new Map();

    links.forEach((link) => {
        const section = document.querySelector(link.getAttribute("href"));

        if (section) linkBySection.set(section, link);
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                links.forEach((link) => link.removeAttribute("aria-current"));
                linkBySection.get(entry.target).setAttribute("aria-current", "location");
            });
        },
      
        { rootMargin: "-40% 0px -55% 0px" }
    );

    linkBySection.forEach((_, section) => observer.observe(section));
}
