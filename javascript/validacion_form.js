document.getElementById('productoForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Evita que se envíe el formulario

    const nombreInput = document.getElementById('nombreProducto').value.trim();
    //const tallas = document.getElementById('tallasProducto').value.trim();
    const categoriasCheckboxInput = document.querySelectorAll('input[name="categoria"]');
    const precioInput = document.getElementById('precioProducto').value.trim();
    const descripcionInput = document.getElementById('descripcionProducto').value.trim();
    const archivosImagenesInput = document.getElementById('imagenArchivo').files;
    const tallaCHInput = document.getElementById('tallaCH').value.trim();
    const tallaMInput = document.getElementById('tallaM').value.trim();
    const tallaGInput = document.getElementById('tallaG').value.trim();
    const unitallaInput = document.getElementById('unitalla').value.trim();
    const descuentoInput = 10;
    const categoriasSeleccionadasInput = Array.from(categoriasCheckboxInput)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    const API_URL = `http://18.218.198.81:8080/db/v1/thekingtiger/agregar-producto`;

    let errores = [];

    if (categoriasSeleccionadasInput.length === 0 || categoriasSeleccionadasInput.length > 1) {
        errores.push("Debes seleccionar al menos una categoría.");
    }
    if (nombreInput === '') errores.push("El nombre es obligatorio.");
    //if (tallas === '') errores.push("Las tallas son obligatorias.");
    
    
    if (Number(tallaCHInput) <0) errores.push("Stock CH debe ser mayor o igual a 0.")
    if (Number(tallaMInput) <0) errores.push("Stock M debe ser mayor o igual a 0.")
    if (tallaGInput <0) errores.push("Stock G debe ser mayor o igual a 0.")
    if (unitallaInput <0) errores.push("Stock Unitalla debe ser mayor o igual a 0.")

    //if (precio === '' || isNaN(precio) || Number(precio) <= 0) errores.push("El precio debe ser un número válido mayor que 0.");
    if (descripcionInput.length < 10) errores.push("La descripción debe tener al menos 10 caracteres.");
    if (archivosImagenesInput.length === 0) errores.push("Debes subir al menos una imagen.");

    mostrarErrores(errores);

    if (errores.length === 0) {
        // Objeto JSON

        let ch, m, g, ut;
        if (tallaCHInput === '') {
          ch = 0;
        }else{
          ch = Number(tallaCHInput)
        }

        if (tallaMInput === '') {
          m = 0;
        }else{
          m = Number(tallaMInput)
        }

        if (tallaGInput === '') {
          g = 0;
        }else{
          g = Number(tallaGInput)
        }

        if (unitallaInput === '') {
          ut = 0;
        }else{
          ut = Number(unitallaInput)
        }
        
        try{
          // Subir imágenes a Cloudinary
          const urlsImagenes = await subirVariasImagenesCloudinary(archivosImagenesInput);

          // Unir las URLs en un solo string separado por comas
          const imagenesString = urlsImagenes.join(', ');

          const categoria = categoriasSeleccionadasInput[0];

          const productos = {
            nomProd: nombreInput,
            imagenes: imagenesString,
            descripcion: descripcionInput,
            chica: Number(ch),
            mediana: Number(m),
            grande: Number(g),
            unitalla: Number(ut),
            precio: parseFloat(precioInput),
            categoria: categoria,
            descuento: descuentoInput
          };
          console.log("Producto creado:", JSON.stringify(productos, null, 2));
          try{
            const res = await fetch(API_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(productos)
            });

            if (!res.ok){
              throw new Error(`Error en la peticion: ${res.status}`);
            }

            const savedProduct = await res.json();
            console.log('Producto registrado:', savedProduct);

            //Mostrar mensaje en el modal
            document.getElementById("modalMessage").innerText = "Producto guardado exitosamente.";
            new bootstrap.Modal(document.getElementById("responseModal")).show()
            
            //Limpiar el formulario
            document.getElementById("productoForm").reset();
            //Reinciar variables
            nombreInput.value = '';
            descripcionInput.value = '';
            tallaCHInput.value = '';
            tallaMInput.value = '';
            tallaGInput.value = '';
            unitallaInput.value = '';
            precioInput.value = '';
            categoria.value = '';

          }catch(err){
            console.error(err);
            alert('Hubo un error al registrar el producto.');
          }
          
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