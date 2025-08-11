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

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Limpiar errores anteriores
        limpiarError();

        // Obtener los valores del formulario
        const nombre = document.getElementById("name").value.trim();
        const apellidos = document.getElementById("lastname").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const contraseña = passwordInput.value.trim();

        // Validación de campos vacíos
        if (!nombre || !apellidos || !correo || !telefono || !contraseña) {
            mostrarError("Todos los campos son obligatorios.");
            return;
        }

        // Validación de formato de correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            mostrarError("El correo no es válido.");
            return;
        }

        // Validación de longitud de contraseña
        if (contraseña.length < 5) {
            mostrarError("La contraseña debe tener al menos 5 caracteres.");
            return;
        }

        // Validación de teléfono
        if (!/^\d{10}$/.test(telefono)) {
            mostrarError("El teléfono debe contener exactamente 10 dígitos.");
            return;
        }

        // Obtener usuarios existentes
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verificar si el correo ya está registrado
        const correoExistente = usuarios.find(u => u.correo === correo);
        if (correoExistente) {
            mostrarError("El correo ya está registrado.");
            return;
        }

        // Crear nuevo usuario
        const nuevoUsuario = {
            nombre,
            apellidos,
            correo,
            telefono,
            contraseña
        };

        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Cuenta creada con éxito. Ahora puedes iniciar sesión.");
        form.reset();
        window.location.href = "inicio_de_sesion.html"; // Asegúrate que esta ruta sea correcta
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