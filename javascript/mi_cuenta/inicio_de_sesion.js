document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById("correo").value.trim();
        const password = document.getElementById("Contraseña").value.trim();

        if (!email || !password) {
            alert("Debes ingresar el correo y la contraseña.");
            return;
        }

        // Validación especial para admin
        // if (email === 'admin@gmail.com' && password === '1234') {
        //     alert("Hola ADMIN :) Inicio de sesión exitoso ✅");
        //     window.location.href = '../formularioProducto.html';
        //     return;
        // }








        try {
            const responseAdmin = await fetch("http://18.218.198.81:8080/db/v1/thekingtiger/login-admin",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    correoAdmin: email,
                    passwordAdmin: password
                })
            });

            if (responseAdmin.status === 404){
                const response = await fetch("http://18.218.198.81:8080/db/v1/thekingtiger/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        correoCliente: email,
                        passwordCliente: password
                    })
                });

                if (response.status === 404) {
                    alert("Correo no registrado ❌");
                    return;
                }

                if (response.status === 401) {
                    alert("Contraseña incorrecta ❌");
                    return;
                }

                const usuario = await response.json();
                alert(`¡Bienvenido, ${usuario.nomCliente}! ✅`);
                const idCliente = localStorage.setItem("idCliente", usuario.idClientes);
                const nomCliente = localStorage.setItem('nombreCliente', usuario.nomCliente);
                window.location.href = "./mi_cuenta.html";

            }else{
                alert("Hola ADMIN :) Inicio de sesión exitoso ✅");
                window.location.href = '../gestor_productos.html';
                return;
            }

            

            
            if (responseAdmin.status === 401) {
                alert("Contraseña incorrecta ❌");
                return;
            }

            

            
        } catch (error) {
            console.error("Error en login:", error);
            alert("No se pudo conectar al servidor ❌");
        }
    });

    const forgotModal = document.getElementById('forgotPasswordModal');
    if (forgotModal) {
        forgotModal.addEventListener('shown.bs.modal', () => {
            document.getElementById('emailRecovery').focus();
        });
    }
    const forgotForm = document.getElementById('forgotPasswordForm');

    forgotForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que el formulario recargue la página

        alert('En tu correo se le llegará las instrucciones para recuperar la contraseña.');

        forgotForm.reset(); // Opcional: limpia el formulario después del alert
    });


});
