import { productos } from "./catalogo.js";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('carrito-productos');
    const totalContainer = document.getElementById('carrito-total');
    const finalizarBtn = document.getElementById('finalizar-compra');
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        container.innerHTML = '<p class="text-center">No hay productos en el carrito.</p>';
        totalContainer.textContent = "$0.00";
        finalizarBtn.disabled = true;
        return;
    }

    const actualizarCarrito = (nuevoCarrito) => {
        localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
        location.reload();
    };

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
                    <img src="${imagen}" class="img-fluid mb-2 border border-secondary" alt="${producto}" style="max-height: 400px; object-fit: contain;">
                    <div class="text-start w-100">
                        <h5 class="card-title  mb-1">${producto}</h5>
                        <p class="card-text small mb-2">${descripcion}</p>
                        <p class="fw-bold text-end mb-0">$${precio}</p>
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

    container.addEventListener('click', e => {
        // Eliminar producto
        if (e.target.classList.contains('eliminar-item')) {
            const key = e.target.getAttribute('data-key');
            carrito = carrito.filter(p => `${p.id}-${p.talla}` !== key);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Eliminado del carrito!",
                showConfirmButton: false,
                timer: 1000
            }).then(() => location.reload());
        }

        // Ajustar cantidad
        if (e.target.classList.contains('ajustar-cantidad')) {
            const key = e.target.getAttribute('data-key');
            const [id, talla] = key.split('-');
            const action = e.target.getAttribute('data-action');

            if (action === 'sumar') {
                carrito.push({ id, talla });
            } else if (action === 'restar') {
                const index = carrito.findIndex(p => p.id === id && p.talla === talla);
                if (index !== -1) carrito.splice(index, 1);
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
            title: "¡Gracias por tu compra!",
            icon: "success",
            confirmButtonText: "Aceptar"
        }).then(() => {
            localStorage.removeItem('carrito');
            window.location.href = 'finalizar-compra.html';
        });
    });
});
