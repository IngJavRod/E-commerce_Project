document.getElementById('productoForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que se envíe el formulario

    const nombre = document.getElementById('nombreProducto').value.trim();
    const tallas = document.getElementById('tallasProducto').value.trim();
    const categoriasCheckbox = document.querySelectorAll('input[name="categoria"]');
    const algunoSeleccionado = Array.from(categoriasCheckbox).some(checkbox => checkbox.checked);
    const precio = document.getElementById('precioProducto').value.trim();
    const descripcion = document.getElementById('descripcionProducto').value.trim();
    const url = document.getElementById('imagenesProducto').value.trim();

    let errores = [];


    if (!algunoSeleccionado) {
        errores.push("Debes seleccionar al menos una categoría.");
    }
    if (nombre === '') errores.push("El nombre es obligatorio.");
    if (tallas === '') errores.push("Las tallas son obligatorias.");
    if (precio === '' || isNaN(precio) || Number(precio) <= 0) errores.push("El precio debe ser un número válido mayor que 0.");
    if (descripcion.length < 10) errores.push("La descripción debe tener al menos 10 caracteres.");
    if (!url.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i)) errores.push("La URL debe ser válida y apuntar a una imagen.");

    mostrarErrores(errores);

    if (errores.length === 0) {
        alert("¡Formulario válido!");
        // Aquí podrías enviar los datos a un servidor, por ejemplo con fetch()
    }
});

function mostrarErrores(errores) {
    const contenedor = document.getElementById('alertas');
    contenedor.innerHTML = ''; // Limpiar alertas anteriores

    if (errores.length > 0) {
        const alerta = document.createElement('div');
        alerta.className = 'alert alert-danger';
        alerta.innerHTML = `
      <strong>¡Errores encontrados!</strong>
      <ul>
        ${errores.map(error => `<li>${error}</li>`).join('')}
      </ul>
    `;
        contenedor.appendChild(alerta);
    }
}
