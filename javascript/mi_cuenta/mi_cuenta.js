const idClientes = localStorage.getItem('idCliente'); 
const API_URL = `http://18.218.198.81:8080/db/v1/thekingtiger/cliente/${idClientes}`;
let datosUsuario = null;

// Cargar datos
if (idClientes) {
    fetch(API_URL)
        .then(res => {
            if (!res.ok) throw new Error('Error al obtener usuario');
            return res.json();
        })
        .then(usuario => {
            datosUsuario = usuario; // Guardar en variable para el modal
            document.getElementById('nombre-usuario').textContent = `${usuario.nomCliente} ${usuario.apellidoCliente}`;
            document.getElementById('correo-usuario').textContent = usuario.correoCliente;
            document.getElementById('telefono-usuario').textContent = usuario.telefonoCliente;
            document.getElementById('direccion-usuario').textContent = usuario.direccionCliente;
        })
        .catch(err => console.error(err));
} else {
    window.location.href = './inicio_de_sesion.html';
}

// Botón Cerrar Sesión
document.getElementById('cerrar-sesion').addEventListener('click', () => {
    localStorage.removeItem('idCliente');
    window.location.href = './inicio_de_sesion.html';
});

// Botón Editar
document.getElementById('editar-datos').addEventListener('click', () => {
    if (!datosUsuario) return;
    // Llenar formulario
    document.getElementById('nombre').value = datosUsuario.nomCliente;
    document.getElementById('apellido').value = datosUsuario.apellidoCliente;
    document.getElementById('correo').value = datosUsuario.correoCliente;
    document.getElementById('telefono').value = datosUsuario.telefonoCliente;
    document.getElementById('direccion').value = datosUsuario.direccionCliente;

    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('modalEditar'));
    modal.show();
});

// Guardar cambios
document.getElementById('form-editar').addEventListener('submit', (e) => {
    e.preventDefault();

    const datosActualizados = {
        nomCliente: document.getElementById('nombre').value,
        apellidoCliente: document.getElementById('apellido').value,
        telefonoCliente: document.getElementById('telefono').value,
        direccionCliente: document.getElementById('direccion').value
    };
    const API_URL2 = `http://18.218.198.81:8080/db/v1/thekingtiger/update-cliente/${idClientes}`;
    fetch(API_URL2, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosActualizados)
    })
    .then(res => {
        if (!res.ok) throw new Error('Error al actualizar usuario');
        return res.json();
    })
    .then(usuario => {
        // Actualizar en pantalla
        document.getElementById('nombre-usuario').textContent = `${usuario.nomCliente} ${usuario.apellidoCliente}`;
        document.getElementById('correo-usuario').textContent = usuario.correoCliente;
        document.getElementById('telefono-usuario').textContent = usuario.telefonoCliente;
        document.getElementById('direccion-usuario').textContent = usuario.direccionCliente;

        // Cerrar modal
        bootstrap.Modal.getInstance(document.getElementById('modalEditar')).hide();
    })
    .catch(err => console.error(err));
});
