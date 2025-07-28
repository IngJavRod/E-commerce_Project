import { productos } from './catalogo.js';

const contenedor = document.getElementById("contenedor-productos");
const formBusqueda = document.getElementById("form-busqueda");
const inputBusqueda = document.getElementById("busqueda-input");


document.getElementById('productoForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que se recargue la página

    const form = e.target;

    // Creamos el objeto JavaScript a partir del formulario
    const datos = {
        nombreProducto: form.nombreProducto.value,
        imagenesProducto: form.imagenesProducto.value,
        descripcionProducto: form.descripcionProducto.value,
        tallasProducto: form.tallasProducto.value,
        precioProducto: form.precioProducto.value,
        catPlayeras: form.catPlayeras.value,
        catPantalones: form.catPantalones.value,
        catSudaderas: form.catSudaderas.value,
        catAccesorios: form.catAccesorios.value
    };

    // Lo convertimos a JSON
    const json = JSON.stringify(datos);

    console.log("JSON generado:", json);
});



// Función para aplicar efectos de hover e imagen dinámica
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
            //img.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
        });

        // card.addEventListener('mousemove', e => {
        //     const rect = card.getBoundingClientRect();
        //     const x = e.clientX - rect.left;
        //     const y = e.clientY - rect.top;
        //     const centerX = rect.width / 2;
        //     const centerY = rect.height / 2;
        //     const rotateX = ((y - centerY) / centerY) * -5;
        //     const rotateY = ((x - centerX) / centerX) * 5;
        //     img.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        // });
    });
}

//Funcion para guardar id
function agregarEventoClic() {
    document.querySelectorAll('.producto-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            const id = parseInt(link.getAttribute('data-id'));
            localStorage.setItem("productoSeleccionado", id);

            window.location.href = "../html/producto.html";
        });
    });
}
// Función para renderizar productos agrupados por categoría
function renderizarProductos(productosLista) {
    if (productosLista.length === 0) {
        contenedor.innerHTML = `<p class="text-center mt-5">No se encontraron productos con ese término.</p>`;
        return;
    }

    const productosPorCategoria = productosLista.reduce((acc, producto) => {
        const categoriaKey = producto.categoria.toLowerCase().replace(/\s+/g, '-');
        if (!acc[categoriaKey]) acc[categoriaKey] = [];
        acc[categoriaKey].push(producto);
        return acc;
    }, {});

    contenedor.innerHTML = Object.entries(productosPorCategoria).map(([categoria, productosCat]) => {
        const categoriaTitulo = categoria.charAt(0).toUpperCase() + categoria.slice(1);

        const productosHTML = productosCat.map(producto => {
            const precioFormateado = producto.precio.toLocaleString('es-MX', {
                style: 'currency',
                currency: 'MXN'
            });
            const imagenesData = JSON.stringify(producto.imagenes);

            return `
                <div class="col-sm-6 col-md-4 col-lg-3 mb-4">
                <a href="#" class="text-decoration-none text-dark d-block h-100 producto-link" data-id="${producto.id}">
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

    aplicarEfectosHover();
    agregarEventoClic(); // Agregar eventos de clic después de renderizar
}

// Evento para buscar productos
formBusqueda.addEventListener("submit", (e) => {
    e.preventDefault();

    const termino = inputBusqueda.value.trim().toLowerCase();

    if (termino === "") {
        renderizarProductos(productos);
        return;
    }

    const filtrados = productos.filter(p => 
        p.producto.toLowerCase().includes(termino) ||
        p.descripcion.toLowerCase().includes(termino)
    );

    renderizarProductos(filtrados);
});

// Render inicial
renderizarProductos(productos);
