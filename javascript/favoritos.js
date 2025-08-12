import { productos } from './catalogo.js';

const contenedorFavoritos = document.getElementById("contenedorFavoritos");
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function renderFavoritos() {
    if (favoritos.length === 0) {
        contenedorFavoritos.innerHTML = '<p class="text-center">No hay productos en favoritos.</p>';
        return;
    }
    contenedorFavoritos.innerHTML = "";
    let html = ""; 
    favoritos.forEach((fav, index) => {
        const producto = productos.find(p => p.id === fav.id);
        if (!producto) return;

        const imagenesData = JSON.stringify(producto.imagenes).replace(/"/g, '&quot;'); 
        const precioFormateado = producto.precio.toLocaleString("es-MX", {
            style: "currency",
            currency: "MXN"
        });

        if (index % 4 === 0) {
            html += `<div class="row mb-4">`;
        }

        html += `
            <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
                <a href="#" class="text-decoration-none text-dark d-block h-100 producto-favorito-link" data-id="${producto.id}">
                    <div class="card h-100" data-imagenes='${imagenesData}'
                        style="width: 100%; height: 100%; background-color: white; border-radius: 5px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); display: flex; flex-direction: column;">
                        
                        <img src="${producto.imagenes[0]}" class="card-img-top" alt="${producto.producto}" 
                            style="height: 300px; object-fit: cover; border-top-left-radius: 10px; border-top-right-radius: 10px;">

                        <div class="card-body" 
                            style="display: flex; flex-direction: column; flex-grow: 1; background-color: white; padding: 1rem;">
                            
                            <h5 class="card-title" style="font-size: 1rem; min-height: 2.4em; margin-bottom: 0.5rem;">
                                ${producto.producto}
                            </h5>

                            <p class="card-text small" style="min-height: 3.5em; margin-bottom: 0.1rem; font-size: 0.95rem;">
                                ${producto.descripcion}
                            </p>

                            <p class="card-text text-end w-100 mb-0 small" 
                                style="margin-top: auto; font-weight: bold; font-size: 0.95rem;">
                                ${precioFormateado}
                            </p>

                            <button type="button" class="btn btn-gray-cool btn-eliminar" data-id="${producto.id}" style="align-self: flex-start; margin-top: 0.5rem;">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </a>
            </div>
        `;

        if ((index % 4 === 3) || (index === favoritos.length - 1)) {
            html += `</div>`;
        }
    });

    contenedorFavoritos.innerHTML = html;

    // Evento clic para ir a producto.html guardando id en localStorage
    document.querySelectorAll(".producto-favorito-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const id = parseInt(link.dataset.id);
            localStorage.setItem("productoSeleccionado", id);
            window.location.href = "../html/producto.html";
        });
    });

    // Evento para eliminar favorito
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();  // Evitar que el click active el link padre
            const idEliminar = parseInt(btn.getAttribute("data-id"));
            favoritos = favoritos.filter(fav => fav.id !== idEliminar);
            localStorage.setItem("favoritos", JSON.stringify(favoritos));
            renderFavoritos();
        });
    });
}

renderFavoritos();


