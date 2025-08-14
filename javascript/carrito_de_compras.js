import { productos } from "./catalogo.js";

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('carrito-productos');
    const totalContainer = document.getElementById('carrito-total');
    const finalizarBtn = document.getElementById('finalizar-compra');

    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    renderizarCarrito();

    container.addEventListener('click', e => {
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
            actualizarCarrito(carrito);
        }

        if (e.target.classList.contains('ajustar-cantidad')) {
            e.preventDefault();
            const key = e.target.getAttribute('data-key');
            const [idStr, talla] = key.split('-');
            const id = Number(idStr);
            const action = e.target.getAttribute('data-action');

            if (action === 'sumar') {
                carrito.push({ id, talla });
            } else if (action === 'restar') {
                const index = carrito.findIndex(p => p.id === id && p.talla === talla);
                if (index !== -1) carrito.splice(index, 1);
            }
            if (carrito.length === 0){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Eliminado del carrito!",
                    showConfirmButton: false,
                    timer: 1000
                });
            }

            actualizarCarrito(carrito);
        }

    });

    finalizarBtn.addEventListener('click', () => {
        const checkbox = document.getElementById('aceptar-terminos');

        if (!checkbox.checked) {
            Swal.fire({
                icon: 'warning',
                title: 'Debes aceptar los Términos y Condiciones',
                confirmButtonText: 'Ok'
            });
            return;
        }

        Swal.fire({
            title: "Carrito confirmado",
            icon: "success",
            confirmButtonText: "Aceptar"
        }).then(() => {
            localStorage.removeItem('carrito');
            window.location.href = 'finalizar-compra.html';
        });
    });
});

const actualizarCarrito = (nuevoCarrito) => {
    carrito = nuevoCarrito;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito();
};

function renderizarCarrito() {
    const container = document.getElementById('carrito-productos');
    const totalContainer = document.getElementById('carrito-total');
    const finalizarBtn = document.getElementById('finalizar-compra');

    if (carrito.length === 0) {
        container.innerHTML = '<p class="text-center">No hay productos en el carrito.</p>';
        totalContainer.textContent = "$0.00";
        finalizarBtn.disabled = true;
        return;
    }

    const agruparCarrito = () => {
        const agrupados = {};
        carrito.forEach(item => {
            const key = `${item.id}-${item.talla}`;
            if (!agrupados[key]) {
                agrupados[key] = { ...item, cantidad: 1 };
            } else {
                agrupados[key].cantidad++;
            }
        });
        return Object.values(agrupados);
    };

    const itemsFinales = agruparCarrito();
    let total = 0;

    container.innerHTML = '';

    itemsFinales.forEach(item => {
        const productoCatalogo = productos.find(p => p.id === item.id);
        if (!productoCatalogo) return;

        const subtotal = productoCatalogo.precio * item.cantidad;
        total += subtotal;

        const col = document.createElement('div');
        col.className = 'col-12 col-md-6';

        const card = document.createElement('div');
        card.className = 'card border-0 h-100 bg-transparent position-relative';

        const eliminarBtn = document.createElement('button');
        eliminarBtn.className = 'btn btn-transparent position-absolute top-0 end-0 m-2 eliminar-item';
        eliminarBtn.setAttribute('data-key', `${item.id}-${item.talla}`);
        eliminarBtn.innerHTML = '&times;';

        const imagen = productoCatalogo.imagenes[0];
        const producto = productoCatalogo.producto;
        const descripcion = productoCatalogo.descripcion || 'Sin descripción';
        const precio = productoCatalogo.precio.toFixed(2);

        card.innerHTML = `
            <div class="row g-0">
                <!-- Lado izquierdo: imagen + detalles -->
                <div class="col-9 d-flex flex-column align-items-center justify-content-center p-2">
                    <div class="card h-100" data-imagenes='${imagen}'
                        style="width: 100%; height: 100%; background-color: white; border-radius: 5px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); display: flex; flex-direction: column;">
                        
                        <img src="${imagen}" class="card-img-top" alt="${producto}" 
                            style="height: 300px; object-fit: cover; border-top-left-radius: 10px; border-top-right-radius: 10px;">

                        <div class="card-body" 
                            style="display: flex; flex-direction: column; flex-grow: 1; background-color: white; padding: 1rem;">
                            
                            <h5 class="card-title" style="font-size: 1rem; min-height: 2.4em; margin-bottom: 0.5rem;">
                                ${producto}
                            </h5>

                            <p class="card-text small" style="min-height: 3.5em; margin-bottom: 0.1rem; font-size: 0.95rem;">
                                ${descripcion}
                            </p>

                            <p class="card-text text-end w-100 mb-0 small" 
                                style="margin-top: auto; font-weight: bold; font-size: 0.95rem;">
                                $${precio}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Lado derecho: talla y cantidad -->
                <div class="col-3 d-flex flex-column align-items-center justify-content-center gap-2 p-2">
                    <span class="badge bg-dark mb-2">${item.talla}</span>
                    <div class="btn-group-vertical">
                        <button class="btn btn-sm btn-outline-secondary ajustar-cantidad" data-key="${item.id}-${item.talla}" data-action="sumar">+</button>
                        <div class="cantidad p-2 text-center border-top border-bottom" 
                            style="border-left: 1px solid #918484ff; border-right: 1px solid #918484ff;">
                        ${item.cantidad}
                        </div>
                        <button class="btn btn-sm btn-outline-secondary ajustar-cantidad" data-key="${item.id}-${item.talla}" data-action="restar">-</button>
                    </div>
                </div>

            </div>
        `;
        card.appendChild(eliminarBtn);
        col.appendChild(card);
        container.appendChild(col);
    });

    totalContainer.textContent = `$${total.toFixed(2)}`;
    finalizarBtn.disabled = false;
}
