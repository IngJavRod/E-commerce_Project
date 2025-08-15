let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    const resumenContainer = document.getElementById('resumen-compra');
    const botonFinalizar = document.getElementById('finalizar-compra');

    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    renderizarResumenCompra();

    resumenContainer.addEventListener('click', e => {
        if (e.target.classList.contains('ajustar-cantidad')) {
            e.preventDefault();
            const key = e.target.getAttribute('data-key');
            const [idStr, talla] = key.split('-');
            const id = Number(idStr);
            const action = e.target.getAttribute('data-action');

            if (action === 'sumar') carrito.push({ id, talla });
            else if (action === 'restar') {
                const index = carrito.findIndex(p => p.id === id && p.talla === talla);
                if (index !== -1) carrito.splice(index, 1);
            }

            actualizarCarritoResumen();
        }

        if (e.target.classList.contains('eliminar-item')) {
            e.preventDefault();
            const key = e.target.getAttribute('data-key');
            carrito = carrito.filter(p => `${p.id}-${p.talla}` !== key);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Eliminado del carrito!",
                showConfirmButton: false,
                timer: 1000
            });
            actualizarCarritoResumen();
        }
    });

    // Botón finalizar compra sin validación

    if(botonFinalizar){
        botonFinalizar.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Sigue en construccion por confirmacion de metodos de pago")
        });
    }

});

const actualizarCarritoResumen = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarResumenCompra();
};

async function renderizarResumenCompra() {
    const resumenContainer = document.getElementById('resumen-compra');

    if (carrito.length === 0) {
        resumenContainer.innerHTML = '<p class="text-center">No hay productos en el carrito.</p>';
        return;
    }

    const agruparCarrito = () => {
        const agrupados = {};
        carrito.forEach(item => {
            const key = `${item.id}-${item.talla}`;
            if (!agrupados[key]) agrupados[key] = { ...item, cantidad: 1 };
            else agrupados[key].cantidad++;
        });
        return Object.values(agrupados);
    };

    const itemsFinales = agruparCarrito();
    let total = 0;
    resumenContainer.innerHTML = '';

    for (let item of itemsFinales) {
        const API_URL = `http://18.218.198.81:8080/db/v1/thekingtiger/productos/${item.id}`;
        try {
            const res = await fetch(API_URL, { headers: { 'Accept': 'application/json' } });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const producto = await res.json();
            if (!producto || !producto.idProductos) continue;

            const subtotal = producto.precio * item.cantidad;
            total += subtotal;
            const imagen = producto.imagenes.split(',')[0];

            resumenContainer.innerHTML += `
                <div class="d-flex align-items-center mb-3 border-bottom pb-2">
                    <img src="${imagen}" alt="${producto.nomProd}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px; margin-right: 10px;">
                    <div class="flex-grow-1">
                        <p class="mb-1" style="font-weight: bold;">${producto.nomProd}</p>
                        <p class="mb-1 text-muted">Talla: ${item.talla}</p>
                        <div class="d-flex align-items-center gap-1">
                            <button class="btn btn-sm btn-outline-secondary ajustar-cantidad" data-key="${item.id}-${item.talla}" data-action="sumar">+</button>
                            <span class="px-2">${item.cantidad}</span>
                            <button class="btn btn-sm btn-outline-secondary ajustar-cantidad" data-key="${item.id}-${item.talla}" data-action="restar">-</button>
                        </div>
                    </div>
                    <div style="font-weight: bold;">$${subtotal.toFixed(2)}</div>
                    <button class="btn btn-sm btn-transparent eliminar-item" data-key="${item.id}-${item.talla}" style="margin-left: 5px;">&times;</button>
                </div>
            `;
        } catch (err) {
            console.error(err);
        }
    }

    resumenContainer.innerHTML += `
        <div class="d-flex justify-content-between mt-3 pt-2 border-top">
            <strong>Total:</strong>
            <strong>$${total.toFixed(2)}</strong>
        </div>
        <button id="finalizar-compra" class="btn btn-gray-cool w-100 mt-3">
            Finalizar Compra
        </button>
    `;
}
