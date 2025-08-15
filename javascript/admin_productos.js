const contenedor = document.getElementById("contenedor-productos");
const API_URL = `http://18.218.198.81:8080/db/v1/thekingtiger/productos`;

// Guardamos los productos para poder editarlos
window.listaProductos = [];

// Cargar productos al iniciar
async function cargarProductos() {
    try {
        const res = await fetch(API_URL, { headers: { 'Accept': 'application/json' } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const productos = await res.json();
        window.listaProductos = productos;

        if (!Array.isArray(productos) || productos.length === 0) {
            contenedor.innerHTML = `<p>No hay productos disponibles</p>`;
            return;
        }

        renderizarProductos(productos);

    } catch (err) {
        console.error("Error al cargar productos:", err);
        contenedor.textContent = "Ocurrió un error al cargar los productos.";
    }
}

cargarProductos();


function renderizarProductos(productosLista) {
    contenedor.innerHTML = productosLista.map(producto => {
        const precioFormateado = producto.precio.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
        });
        const imagenes = producto.imagenes.split(',').map(i => i.trim());

        return `
            <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card h-100" style="box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
                    <img src="${imagenes[0]}" class="card-img-top" alt="${producto.nomProd}" style="height: 300px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${producto.nomProd}</h5>
                        <p class="card-text small">${producto.descripcion}</p>
                        <p class="fw-bold mt-auto text-center">${precioFormateado}</p>
                        <div class="d-flex justify-content-between mt-2">
                            <button class="btn btn-gray-cool btn-editar" data-id="${producto.idProductos}">Editar</button>
                            <button class="btn btn-gray-cool btn-eliminar" data-id="${producto.idProductos}">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    agregarEventos();
}

function agregarEventos() {
    // Abrir modal para editar
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', e => {
            const id = parseInt(btn.getAttribute('data-id'));
            const producto = window.listaProductos.find(p => p.idProductos === id);
            if (!producto) return;

            document.getElementById('editar-id').value = producto.idProductos;
            document.getElementById('editar-precio').value = producto.precio;
            document.getElementById('editar-chica').value = producto.chica || 0;
            document.getElementById('editar-mediana').value = producto.mediana || 0;
            document.getElementById('editar-grande').value = producto.grande || 0;
            document.getElementById('editar-unitalla').value = producto.unitalla || 0;

            const modal = new bootstrap.Modal(document.getElementById('modalEditarProducto'));
            modal.show();
        });
    });

    // Eliminar producto
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', async e => {
            const id = parseInt(btn.getAttribute('data-id'));
            if (!confirm("¿Seguro que quieres eliminar este producto?")) return;

            try {
                const res = await fetch(`http://18.218.198.81:8080/db/v1/thekingtiger/eliminar-producto/${id}`, { method: 'DELETE' });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                // No confiamos en lo que devuelva DELETE, recargamos lista
                await cargarProductos();

            } catch (err) {
                console.error("Error al eliminar producto:", err);
            }
        });
    });

}

// Guardar cambios del modal
// Guardar cambios del modal
document.getElementById('formEditarProducto').addEventListener('submit', async e => {
    e.preventDefault();

    const id = document.getElementById('editar-id').value;
    const datos = {
        precio: parseFloat(document.getElementById('editar-precio').value), // decimal
        chica: parseInt(document.getElementById('editar-chica').value) || 0,
        mediana: parseInt(document.getElementById('editar-mediana').value) || 0,
        grande: parseInt(document.getElementById('editar-grande').value) || 0,
        unitalla: parseInt(document.getElementById('editar-unitalla').value) || 0
    };

    try {
        const res = await fetch(`http://localhost:8080/db/v1/thekingtiger/update-producto/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        // Después de actualizar, recargamos la lista desde el servidor
        await cargarProductos();

        bootstrap.Modal.getInstance(document.getElementById('modalEditarProducto')).hide();

    } catch (err) {
        console.error("Error al actualizar producto:", err);
    }
});



