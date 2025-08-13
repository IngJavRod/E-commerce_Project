import { productos } from "./javascript/catalogo.js";

// Filtra los productos "novedad"
const novedades = productos
    .filter(p => p.isNew)
    .slice(-4) // Muestra los 4 más recientes

const contenedor = document.getElementById("novedades-contenedor");

function crearCard(producto) {
    const precioFormateado = producto.precio.toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN'
    });
    const imagenesData = JSON.stringify(producto.imagenes);

    // Card igual a productos.html
    return `
        <div class="col-12 col-sm-6 col-md-3 mb-4">
            <a href="#" class="text-decoration-none text-dark d-block producto-link" data-id="${producto.id}">
                <div class="card" data-imagenes='${imagenesData}'>
                    <img src="${producto.imagenes[0]}" class="card-img-top" alt="${producto.producto}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.producto}</h5>
                        <p class="card-text mb-1 small">${producto.descripcion}</p>
                        <p class="card-text text-end w-100 mb-0 small"><strong>${precioFormateado}</strong></p>
                    </div>
                </div>
            </a>
        </div> 
    `;
}

// Render cards
contenedor.innerHTML = novedades.map(crearCard).join("");

// Hover y click para ir al detalle igual que en productos.js
function aplicarEfectosHover() {
    document.querySelectorAll('.card').forEach(card => {
        const img = card.querySelector('.card-img-top');
        const imagenes = JSON.parse(card.getAttribute('data-imagenes'));
        const cantidad = imagenes.length;

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const ancho = rect.width;
            let index = Math.floor((x / ancho) * cantidad);
            index = Math.max(0, Math.min(index, cantidad - 1));
            img.src = imagenes[index];
        });

        card.addEventListener('mouseleave', () => {
            img.src = imagenes[0];
            img.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
        });

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            img.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
}
aplicarEfectosHover();

// Evento para ir al detalle del producto
document.querySelectorAll('.producto-link').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const id = parseInt(link.getAttribute('data-id'));
        localStorage.setItem("productoSeleccionado", id);
        window.location.href = "html/producto.html";
    });
});