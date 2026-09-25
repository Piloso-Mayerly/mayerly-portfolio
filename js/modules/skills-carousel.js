export function initSkillsCarousel() {
    const track = document.querySelector(".skills__track");
    const prev = document.querySelector(".skills__button--prev");
    const next = document.querySelector(".skills__button--next");
    const current = document.querySelector(".skills__current");
    const total = document.querySelector(".skills__total");

    if (!track || !prev || !next || !current || !total) return;

    const cards = track.querySelectorAll(".skill-card");

    if (!cards.length) return;

    total.textContent = String(cards.length).padStart(2, "0");

    const getStep = () => {
        const styles = getComputedStyle(track);
        const gap = parseFloat(styles.columnGap) || 0;

        return cards[0].offsetWidth + gap;
    };

    const updateCounter = () => {
        const maxScrollLeft = track.scrollWidth - track.clientWidth;
        const isAtEnd = Math.abs(track.scrollLeft - maxScrollLeft) < 2;

        if (isAtEnd) {
            current.textContent = String(cards.length).padStart(2, "0");
            return;
        }

        const index = Math.round(track.scrollLeft / getStep());
        const safeIndex = Math.min(index, cards.length - 1);

        current.textContent = String(safeIndex + 1).padStart(2, "0");
    };

    next.addEventListener("click", () => {
        track.scrollBy({
            left: getStep(),
            behavior: "smooth"
        });
    });

    prev.addEventListener("click", () => {
        track.scrollBy({
            left: -getStep(),
            behavior: "smooth"
        });
    });

    track.addEventListener(
        "scroll",
        updateCounter,
        { passive: true }
    );

    updateCounter();
}