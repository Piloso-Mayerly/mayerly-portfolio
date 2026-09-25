

export function initDesignTokens() {
    const tokens = document.querySelectorAll("[data-token]");

    if (!tokens.length) return;

    const render = () => {
        const styles = getComputedStyle(document.documentElement);

        tokens.forEach((element) => {
            const value = styles.getPropertyValue(element.dataset.token).trim();

            if (!value) return;

            element.textContent = value.startsWith("#") ? value.toUpperCase() : value;
        });
    };

    render();
    document.addEventListener("themechange", render);
}
