const contenedorFavoritos = document.getElementById("contenedorFavoritos");
let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function actualizarFavoritos(nuevosFavoritos) {
    favoritos = nuevosFavoritos;
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    renderFavoritos();
}

async function renderFavoritos() {
    if (favoritos.length === 0) {
        contenedorFavoritos.innerHTML = '<p class="text-center">No hay productos en favoritos.</p>';
        return;
    }

    contenedorFavoritos.innerHTML = "";
    let html = "";

    for (let index = 0; index < favoritos.length; index++) {
        const fav = favoritos[index];

        try {
            const res = await fetch(`http://18.218.198.81:8080/db/v1/thekingtiger/productos/${fav.id}`, {
                headers: { 'Accept': 'application/json' }
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const producto = await res.json();
            if (!producto || !producto.idProductos) continue;

            const imagenesArray = producto.imagenes.split(',');
            const imagen = imagenesArray[0];
            const precio = producto.precio.toFixed(2);
            const descripcion = producto.descripcion || 'Sin descripción';

            if (index % 4 === 0) html += `<div class="row mb-4">`;

            html += `
                <div class="col-sm-6 col-md-3 mb-4">
                    <div class="card h-100 position-relative" data-id="${producto.idProductos}" 
                        style="width: 100%; height: 100%; background-color: white; border-radius: 5px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); display: flex; flex-direction: column; cursor: pointer;">
                        <img src="${imagen}" class="card-img-top" alt="${producto.nomProd}" 
                            style="height: 200px; object-fit: cover; border-top-left-radius: 10px; border-top-right-radius: 10px;">
                        <div class="card-body d-flex flex-column flex-grow-1 p-3">
                            <h5 class="card-title" style="font-size: 1rem; min-height: 2.4em; margin-bottom: 0.5rem;">
                                ${producto.nomProd}
                            </h5>
                            <p class="card-text small" style="min-height: 3em; margin-bottom: 0.1rem; font-size: 0.85rem;">
                                ${descripcion}
                            </p>
                            <p class="card-text text-end w-100 mb-0 small" style="margin-top: auto; font-weight: bold; font-size: 0.95rem;">
                                $${precio}
                            </p>
                        </div>
                        <button type="button" class="btn btn-gray-cool btn-eliminar" data-id="${producto.idProductos}" style="align-self: flex-center; margin-top: 0.5rem;"> Eliminar </button>
                    </div>
                </div>
            `;

            if (index % 4 === 3 || index === favoritos.length - 1) html += `</div>`;

        } catch (err) {
            console.error(err);
        }
    }

    contenedorFavoritos.innerHTML = html;

    // Evento eliminar
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const idEliminar = parseInt(btn.getAttribute("data-id"));
            actualizarFavoritos(favoritos.filter(fav => fav.id !== idEliminar));
        });
    });

    // Evento click para ir a producto.html
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", () => {
            const id = parseInt(card.getAttribute("data-id"));
            localStorage.setItem("productoSeleccionado", id);
            window.location.href = "../html/producto.html";
        });
    });
}

renderFavoritos();
