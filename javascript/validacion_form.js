document.getElementById('productoForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Evita que se envíe el formulario

    const nombre = document.getElementById('nombreProducto').value.trim();
    //const tallas = document.getElementById('tallasProducto').value.trim();
    const categoriasCheckbox = document.querySelectorAll('input[name="categoria"]');
    const precio = document.getElementById('precioProducto').value.trim();
    const descripcion = document.getElementById('descripcionProducto').value.trim();
    const archivosImagenes = document.getElementById('imagenArchivo').files;
    const tallaCH = document.getElementById('tallaCH').value.trim();
    const tallaM = document.getElementById('tallaM').value.trim();
    const tallaG = document.getElementById('tallaG').value.trim();
    const unitalla = document.getElementById('unitalla').value.trim();

    const categoriasSeleccionadas = Array.from(categoriasCheckbox)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    
    let errores = [];

    if (categoriasSeleccionadas.length === 0) {
        errores.push("Debes seleccionar al menos una categoría.");
    }
    if (nombre === '') errores.push("El nombre es obligatorio.");
    //if (tallas === '') errores.push("Las tallas son obligatorias.");
    
    
    if (Number(tallaCH) <0) errores.push("Stock CH debe ser mayor o igual a 0.")
    if (Number(tallaM) <0) errores.push("Stock M debe ser mayor o igual a 0.")
    if (tallaG <0) errores.push("Stock G debe ser mayor o igual a 0.")
    if (unitalla <0) errores.push("Stock Unitalla debe ser mayor o igual a 0.")

    //if (precio === '' || isNaN(precio) || Number(precio) <= 0) errores.push("El precio debe ser un número válido mayor que 0.");
    if (descripcion.length < 10) errores.push("La descripción debe tener al menos 10 caracteres.");
    if (archivosImagenes.length === 0) errores.push("Debes subir al menos una imagen.");

    mostrarErrores(errores);

    if (errores.length === 0) {
        // Objeto JSON

        let ch, m, g, ut;
        if (tallaCH === '') {
          ch = 0;
        }else{
          ch = Number(tallaCH)
        }

        if (tallaM === '') {
          m = 0;
        }else{
          m = Number(tallaM)
        }

        if (tallaG === '') {
          g = 0;
        }else{
          g = Number(tallaG)
        }

        if (unitalla === '') {
          ut = 0;
        }else{
          ut = Number(unitalla)
        }
        
        try{
          // Subir imágenes a Cloudinary
          const urlsImagenes = await subirVariasImagenesCloudinary(archivosImagenes);
          const producto = {
            nombre,
            imagenes: urlsImagenes,
            descripcion,
            tallaCH: Number(ch),
            tallaM: Number(m),
            tallaG: Number(g),
            unitalla: Number(ut),
            // tallas.split(',').map(talla => talla.trim()),
            precio: Number(precio),
            categorias: categoriasSeleccionadas
          };
          // Mostrar en consola 
          console.log("Producto creado:", JSON.stringify(producto, null, 2));
          //Mostrar mensaje en el modal
          document.getElementById("modalMessage").innerText = "Producto guardado exitosamente.";
          new bootstrap.Modal(document.getElementById("responseModal")).show()
          // Opcional: limpiar el formulario
          document.getElementById("productoForm").reset();
        } catch (error) {
          mostrarErrores(["Error al subir imágenes: " + error.message]);
        }

        
        

        
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

// Esperar a que cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('productoForm');

  formulario.addEventListener('submit', function (event) {
    if (!formulario.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    formulario.classList.add('was-validated');
  });
});


//Sube las fotos a cloudinary
async function subirVariasImagenesCloudinary(files) {
  const urlCloudinary = "https://api.cloudinary.com/v1_1/dxxk8zhoi/image/upload";
  const upload_preset = "preset_public";

  const urls = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);

    const respuesta = await fetch(urlCloudinary, {
      method: "POST",
      body: formData,
    });

    const data = await respuesta.json();

    if (data.secure_url) {
      urls.push(data.secure_url);
    } else {
      throw new Error("Error al subir la imagen " + file.name);
    }
  }

  return urls;
}