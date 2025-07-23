    // Espera a que cargue el DOM para enlazar evento
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // evita que se envíe el formulario y recargue la página
        
        const email = form.correo.value.trim();
        const password = form.Contraseña.value.trim();
        
        if (email === 'admin@gmail.com' && password === '1234') {
        // Redirige a formularioProducto.html
        window.location.href = '../formularioProducto.html';
        } else {
        alert('Correo o contraseña incorrectos');
        }
    });
});
