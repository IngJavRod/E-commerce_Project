document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById("correo").value.trim();
        const password = document.getElementById("Contraseña").value.trim();

        if (!email || !password) {
            alert("Debes ingresar el correo y la contraseña.");
            return;
        }

        // Validación especial para admin
        if (email === 'admin@gmail.com' && password === '1234') {
            alert("Hola ADMIN :) Inicio de sesión exitoso ✅");
            window.location.href = '../formularioProducto.html';
            return;
        }

        // Validación para usuarios registrados
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuario = usuarios.find(u => u.correo === email);

        if (!usuario) {
            alert("Correo no registrado ❌");
            return;
        }

        if (usuario.contraseña !== password) {
            alert("Contraseña incorrecta ❌");
            return;
        }

        alert(`¡Bienvenido, ${usuario.nombre}! Has iniciado sesión correctamente ✅`);
        window.location.href = '/pagina_principal.html';
    });
});
