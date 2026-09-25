

const validators = {
    "contact-name": (input) =>
        input.value.trim().length < 2 ? "Ingresa un nombre válido." : "",

    "contact-email": (input) => {
        if (input.value.trim() === "") return "Ingresa tu correo electrónico.";

        return input.validity.valid ? "" : "Ingresa un correo electrónico válido.";
    },

    "contact-message": (input) =>
        input.value.trim().length < 10
            ? "El mensaje debe tener al menos 10 caracteres."
            : ""
};

export function initContactForm() {
    const form = document.querySelector("#contact-form");
    const status = document.querySelector("#form-status");

    if (!form || !status) return;

    const inputs = [...form.querySelectorAll("input, textarea")];

    const validateField = (input) => {
        const message = validators[input.id](input);
        const errorElement = input.closest(".form-field").querySelector(".form-field__error");

        errorElement.textContent = message;

        if (message) {
            input.setAttribute("aria-invalid", "true");
        } else {
            input.removeAttribute("aria-invalid");
        }

        return message === "";
    };

  
    inputs.forEach((input) => {
        input.addEventListener("blur", () => validateField(input));

        input.addEventListener("input", () => {
            if (input.hasAttribute("aria-invalid")) validateField(input);
        });
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        
        const results = inputs.map(validateField);

        if (!results.every(Boolean)) {
            status.textContent = "Revisa los campos indicados antes de enviar.";
            form.querySelector("[aria-invalid]")?.focus();
            return;
        }

        const name = form.querySelector("#contact-name").value.trim();
        const email = form.querySelector("#contact-email").value.trim();
        const message = form.querySelector("#contact-message").value.trim();

        const subject = encodeURIComponent(`Contacto desde tu portafolio: ${name}`);
        const body = encodeURIComponent(`${message}\n\nNombre: ${name}\nCorreo: ${email}`);

        status.textContent = "Se abrirá tu aplicación de correo con el mensaje listo para enviar.";
        window.location.href = `mailto:${form.dataset.recipient}?subject=${subject}&body=${body}`;
    });
}
