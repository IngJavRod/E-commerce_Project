import { productos } from "./catalogo.js";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('carrito-productos');
    const totalContainer = document.getElementById('carrito-total');
    const finalizarBtn = document.getElementById('finalizar-compra');
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        container.innerHTML = '<p class="text-center">No hay productos en el carrito.</p>';
        totalContainer.textContent = "$0.00";
        finalizarBtn.disabled = true;
        return;
    }

    const agrupados = {};
    carrito.forEach(item => {
        const key = `${item.id}-${item.talla}`;
        if (!agrupados[key]) {
            agrupados[key] = { ...item, cantidad: 1 };
        } else {
            agrupados[key].cantidad++;
        }
    });

    const itemsFinales = Object.values(agrupados);
    let total = 0;

    const tablaWrapper = document.createElement('div');
    tablaWrapper.classList.add('table-responsive');

    const tabla = document.createElement('table');
    tabla.classList.add('table', 'table-bordered', 'table-hover', 'align-middle', 'text-center');

    tabla.innerHTML = `
        <thead class="table-dark">
            <tr>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Talla</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = tabla.querySelector('tbody');

    itemsFinales.forEach(item => {
        const productoCatalogo = productos.find(p => p.id === item.id);
        if (!productoCatalogo) return;

        const subtotal = productoCatalogo.precio * item.cantidad;
        total += subtotal;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><img src="${productoCatalogo.imagenes[0]}" alt="${productoCatalogo.producto}" style="width:60px; height:auto;"></td>
            <td>${productoCatalogo.producto}</td>
            <td>${item.talla}</td>
            <td>${item.cantidad}</td>
            <td>$${productoCatalogo.precio.toFixed(2)}</td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-danger eliminar-item" data-key="${item.id}-${item.talla}">
                    X
                </button>
            </td>
        `;
        tbody.appendChild(fila);
    });

    tablaWrapper.appendChild(tabla);
    container.innerHTML = '';
    container.appendChild(tablaWrapper);

    totalContainer.textContent = `$${total.toFixed(2)}`;

    container.addEventListener('click', e => {
        if (e.target.classList.contains('eliminar-item')) {
            const key = e.target.getAttribute('data-key');
            let carritoPlano = JSON.parse(localStorage.getItem('carrito')) || [];
            carritoPlano = carritoPlano.filter(p => `${p.id}-${p.talla}` !== key);
            localStorage.setItem('carrito', JSON.stringify(carritoPlano));
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Eliminado del carrito!",
                showConfirmButton: false,
                timer: 1000
            }).then(() => {
                location.reload();
            });
        }
    });

    finalizarBtn.addEventListener('click', () => {
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
