/* ==============================
   SKILLS CAROUSEL
   ============================== */

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