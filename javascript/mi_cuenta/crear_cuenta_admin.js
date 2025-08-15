document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const passwordInput = document.getElementById("Contraseña");
    
    // Crear botón para mostrar/ocultar contraseña (si no lo tienes en el HTML)
    // Pero si ya lo agregaste en HTML, solo referencia el botón aquí:
    const togglePasswordBtn = document.getElementById("togglePassword");

    togglePasswordBtn.addEventListener("click", () => {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        togglePasswordBtn.innerHTML = type === "password"
            ? '<i class="bi bi-eye"></i>'
            : '<i class="bi bi-eye-slash"></i>';
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Limpiar errores anteriores
        limpiarError();

        // Obtener los valores del formulario
        const nombreInput = document.getElementById("name").value.trim();
        const correoInput = document.getElementById("correo").value.trim();
        const contrasenaInput = passwordInput.value.trim();

        //End-Point del Back-end
        const API_URL = `http://18.218.198.81:8080/db/v1/thekingtiger/agregar-admin`;


        // Validación de campos vacíos
        if (!nombreInput || !correoInput || !contrasenaInput) {
            mostrarError("Todos los campos son obligatorios.");
            return;
        }

        // Validación de formato de correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correoInput)) {
            mostrarError("El correo no es válido.");
            return;
        }

        // Validación de longitud de contraseña
        if (contrasenaInput.length < 5) {
            mostrarError("La contraseña debe tener al menos 5 caracteres.");
            return;
        }

        // Obtener usuarios existentes
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verificar si el correo ya está registrado
        const correoExistente = usuarios.find(u => u.correoInput === correoInput);
        if (correoExistente) {
            mostrarError("El correo ya está registrado.");
            return;
        }

        // Crear nuevo usuario
        const clientes = {
            nomAdmin: nombreInput,
            correoAdmin: correoInput,
            passwordAdmin: contrasenaInput
        };
        try{
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientes)
            });
            if(res.status === 409){
                mostrarError("El correo ya está registrado en el sistema.");
                return;
            }
            if (!res.ok){
                throw new Error(`Error en la peticion: ${res.status}`);
            }
            
            const savedUser = await res.json();
            console.log('Usuario registrado:', savedUser);

            alert("Cuenta creada con éxito. Ahora puedes iniciar sesión.");
            form.reset();
            window.location.href = "inicio_de_sesion.html"; 
        }catch(err){
            console.error(err);
            alert('Hubo un error al registrar el usuario.');
        }


        
    });
});

function mostrarError(mensaje) {
    const errorContainer = document.getElementById("errorContainer");
    if (errorContainer) {
        errorContainer.textContent = mensaje;
        errorContainer.classList.remove("d-none");
    }
}

function limpiarError() {
    const errorContainer = document.getElementById("errorContainer");
    if (errorContainer) {
        errorContainer.textContent = "";
        errorContainer.classList.add("d-none");
    }
}

document.getElementById('btn-regresar').addEventListener('click', () => {
    history.back();
});
