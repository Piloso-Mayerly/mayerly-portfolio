

const skillsTrack = document.querySelector(".skills__track");
const skillCards = document.querySelectorAll(".skill-card");
const prevSkillButton = document.querySelector(".skills__button--prev");
const nextSkillButton = document.querySelector(".skills__button--next");
const skillsCounter = document.querySelector(".skills__counter span");

if (
    skillsTrack &&
    skillCards.length > 0 &&
    prevSkillButton &&
    nextSkillButton &&
    skillsCounter
) {
    let currentSkill = 0;

    const updateSkillsCarousel = () => {
        skillCards[currentSkill].scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
        });

        skillsCounter.textContent = String(currentSkill + 1).padStart(2, "0");
    };

    nextSkillButton.addEventListener("click", () => {
        currentSkill = (currentSkill + 1) % skillCards.length;

        updateSkillsCarousel();
    });

    prevSkillButton.addEventListener("click", () => {
        currentSkill =
            (currentSkill - 1 + skillCards.length) % skillCards.length;

        updateSkillsCarousel();
    });
}


const menuToggle = document.querySelector(".menu-toggle");
const navbarMenu = document.querySelector(".navbar__menu");
const navbarLinks = document.querySelectorAll(".navbar__link");

if (menuToggle && navbarMenu) {
    const closeMenu = () => {
        navbarMenu.classList.remove("navbar__menu--open");
        menuToggle.classList.remove("menu-toggle--open");
        menuToggle.setAttribute("aria-expanded", "false");
    };

    menuToggle.addEventListener("click", () => {
        const isOpen = navbarMenu.classList.toggle("navbar__menu--open");

        menuToggle.classList.toggle("menu-toggle--open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navbarLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
}





const contactForm = document.querySelector("#contact-form");
const nameInput = document.querySelector("#contact-name");
const emailInput = document.querySelector("#contact-email");
const messageInput = document.querySelector("#contact-message");

const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");

const formStatus = document.querySelector("#form-status");

if (
    contactForm &&
    nameInput &&
    emailInput &&
    messageInput &&
    nameError &&
    emailError &&
    messageError &&
    formStatus
) {
    const showError = (input, errorElement, message) => {
        errorElement.textContent = message;
        input.setAttribute("aria-invalid", "true");
    };

    const clearError = (input, errorElement) => {
        errorElement.textContent = "";
        input.removeAttribute("aria-invalid");
    };

    const validateName = () => {
        const name = nameInput.value.trim();

        if (name.length < 2) {
            showError(
                nameInput,
                nameError,
                "Ingresa un nombre válido."
            );

            return false;
        }

        clearError(nameInput, nameError);
        return true;
    };

    const validateEmail = () => {
        const email = emailInput.value.trim();

        if (email === "") {
            showError(
                emailInput,
                emailError,
                "Ingresa tu correo electrónico."
            );

            return false;
        }

        if (!emailInput.validity.valid) {
            showError(
                emailInput,
                emailError,
                "Ingresa un correo electrónico válido."
            );

            return false;
        }

        clearError(emailInput, emailError);
        return true;
    };

    const validateMessage = () => {
        const message = messageInput.value.trim();

        if (message.length < 10) {
            showError(
                messageInput,
                messageError,
                "El mensaje debe tener al menos 10 caracteres."
            );

            return false;
        }

        clearError(messageInput, messageError);
        return true;
    };

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            formStatus.textContent =
                "Formulario validado correctamente.";

            return;
        }

        formStatus.textContent =
            "Revisa los campos indicados antes de enviar.";
    });
}