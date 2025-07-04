// ----------------   Slider ----------------- //

const container = document.getElementById("card-slider");
const cards = container.querySelectorAll(".card");
const prevBtn = document.querySelector(".slide-button.prev");
const nextBtn = document.querySelector(".slide-button.next");

const cardCount = cards.length;
const visibleCards = 3;

for (let i = cardCount - visibleCards; i < cardCount; i++) {
    const clone = cards[i].cloneNode(true);
    clone.classList.add("clone");
    container.insertBefore(clone, container.firstChild);
}

for (let i = 0; i < visibleCards; i++) {
    const clone = cards[i].cloneNode(true);
    clone.classList.add("clone");
    container.appendChild(clone);
    }

function getScrollAmount() {
    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(getComputedStyle(container).gap) || 0;
    return cardWidth + gap;
}

const scrollAmount = getScrollAmount();

container.scrollLeft = scrollAmount * visibleCards;

prevBtn.addEventListener("click", () => {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

nextBtn.addEventListener("click", () => {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

// Función para hacer el salto invisible sin animación
function jumpWithoutAnimation(position) {
    container.style.scrollBehavior = "auto";
    container.scrollLeft = position;
    // Forzar reflow para asegurar que el cambio tome efecto
    container.offsetHeight; 
    container.style.scrollBehavior = "smooth";
}

let isThrottled = false;
container.addEventListener("scroll", () => {
    if (isThrottled) return;
    isThrottled = true;

    setTimeout(() => {
        const maxScroll = scrollAmount * (cardCount + visibleCards);

        if (container.scrollLeft <= 0) {
        jumpWithoutAnimation(scrollAmount * cardCount);
        } else if (container.scrollLeft >= maxScroll) {
        jumpWithoutAnimation(scrollAmount * visibleCards);
        }

        isThrottled = false;
    }, 100);
});

// --- Código para flip al click ---

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
    });
});

