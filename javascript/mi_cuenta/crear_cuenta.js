document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById("name").value.trim() + " " + document.getElementById("lastname").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const contraseña = document.getElementById("Contraseña").value.trim();

        if (!nombre || !correo || !contraseña) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        // Obtenemos los usuarios existentes
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verificamos si ya hay un usuario con ese correo
        const existe = usuarios.find(u => u.correo === correo);
        if (existe) {
            alert("Este correo ya está registrado.");
            return;
        }

        // Agregamos el nuevo usuario
        usuarios.push({ nombre, correo, contraseña });

        // Guardamos el arreglo actualizado en localStorage
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Cuenta creada exitosamente ✅");
        form.reset();
        window.location.href = "/html/mi_cuenta/inicio_de_sesion.html";
    });
});