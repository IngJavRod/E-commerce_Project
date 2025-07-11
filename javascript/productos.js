import { productos } from './catalogo.js';

const contenedor = document.getElementById("contenedor-productos");

// Agrupar productos por categoría
const productosPorCategoria = productos.reduce((acc, producto) => {
    // La categoría la normalizamos a minúsculas y sin espacios para usar en id
    const categoriaKey = producto.categoria.toLowerCase().replace(/\s+/g, '-');
    if (!acc[categoriaKey]) acc[categoriaKey] = [];
    acc[categoriaKey].push(producto);
    return acc;
}, {});

contenedor.innerHTML = Object.entries(productosPorCategoria).map(([categoria, productosCat]) => {
    const categoriaTitulo = categoria.charAt(0).toUpperCase() + categoria.slice(1);

    // Crear productos de la categoría
    const productosHTML = productosCat.map(producto => {
        const precioFormateado = producto.precio.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
        });
        const imagenesData = JSON.stringify(producto.imagenes);
        return `
        <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
            <a href="/producto.html?id=${producto.id}" class="text-decoration-none text-dark d-block h-100">
                <div class="card h-100" data-imagenes='${imagenesData}' style="width: 100%;">
                    <img 
                    src="${producto.imagenes[0]}" 
                    class="card-img-top" 
                    alt="${producto.producto}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.producto}</h5>
                        <p class="card-text mb-1 small">${producto.descripcion}</p>
                        <p class="card-text text-end w-100 mb-0 small"><strong>${precioFormateado}</strong></p>
                    </div>
                </div>
            </a>
        </div>
        `;
    }).join('');

    return `
    <section id="categoria-${categoria}" class="mb-5">
        <h3 class="rubik-style mb-3 text-center">${categoriaTitulo}</h3>
        <div class="row">
            ${productosHTML}
        </div>
    </section>
    `;
}).join('');

// Mantén el resto del código para efectos y eventos después de que el DOM se actualice

document.querySelectorAll('.card').forEach(card => {
    const img = card.querySelector('.card-img-top');
    const imagenes = JSON.parse(card.getAttribute('data-imagenes'));
    const cantidad = imagenes.length;

    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const ancho = rect.width;

        let index = Math.floor((x / ancho) * cantidad);
        if (index < 0) index = 0;
        if (index >= cantidad) index = cantidad - 1;

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
