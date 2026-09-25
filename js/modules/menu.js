

export function initMenu() {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector("#navbar-menu");

    if (!toggle || !menu) return;

    const setOpen = (isOpen) => {
        menu.classList.toggle("navbar__menu--open", isOpen);
        toggle.classList.toggle("menu-toggle--open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
        toggle.setAttribute(
            "aria-label",
            isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"
        );
    };

    toggle.addEventListener("click", () => {
        setOpen(!menu.classList.contains("navbar__menu--open"));
    });

  
    menu.addEventListener("click", (event) => {
        if (event.target.closest(".navbar__link")) setOpen(false);
    });

  
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setOpen(false);
    });


    window.matchMedia("(min-width: 769px)").addEventListener("change", (event) => {
        if (event.matches) setOpen(false);
    });
}
