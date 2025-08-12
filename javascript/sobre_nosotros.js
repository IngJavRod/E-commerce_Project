// ----------------   Slider ----------------- //

const container = document.getElementById("card-slider");
const cards = container.querySelectorAll(".card");
const prevBtn = document.querySelector(".slide-button.prev");
const nextBtn = document.querySelector(".slide-button.next");

const cardCount = cards.length;
const visibleCards = 3;

function getScrollAmount() {
    const cardWidth = cards[0].offsetWidth;
    const gap = parseInt(getComputedStyle(container).gap) || 0;
    return cardWidth + gap;
}

const scrollAmount = getScrollAmount();

// Evento scroll para activar/desactivar botones según posición
container.addEventListener("scroll", updateButtons);

// Función para actualizar el estado de los botones
function updateButtons() {
    const maxScrollLeft = container.scrollWidth - container.clientWidth;

    prevBtn.disabled = container.scrollLeft <= 0;
    nextBtn.disabled = container.scrollLeft >= maxScrollLeft - 5; // pequeño margen
}

// Desplazamiento a la izquierda
prevBtn.addEventListener("click", () => {
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

// Desplazamiento a la derecha
nextBtn.addEventListener("click", () => {
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

// Inicializar botones en el estado correcto
updateButtons();

// --- Código para flip al click ---

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
    });
});

