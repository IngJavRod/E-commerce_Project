document.addEventListener("DOMContentLoaded", () => {
    createFooter()
    createNavbar()

    // Ajustar el enlace del icono de usuario según sesión
    const idCliente = localStorage.getItem("idCliente");
    const iconoUsuario = document.querySelector(".navbar-right .bi-person").parentElement;
    
    if (idCliente) {
        iconoUsuario.href = "/html/mi_cuenta/mi_cuenta.html";
    } else {
        iconoUsuario.href = "/html/mi_cuenta/inicio_de_sesion.html";
    }
})

// Función para crear el Navbar
function createNavbar() {
    const navbarElement = document.querySelector('header');
    const navbarContent = `
        <nav class="navbar">
            <div class="container-fluid d-flex align-items-center justify-content-between">
                <!-- IZQUIERDA: Botón hamburguesa -->
                <div class="navbar-left d-flex align-items-center" style="flex: 1;">
                    <button class="navbar-toggler d-block" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                </div>

                <!-- CENTRO: Logo -->
                <div class="navbar-center d-flex justify-content-center align-items-center flex-grow-1" style="height: 100px;">
                    <a class="navbar-brand d-flex align-items-center justify-content-center m-0 p-0" href="../../index.html" style="line-height: 0;">
                        <img src="https://i.postimg.cc/NGdNKDVM/logo-navbar.png" alt="Logo Navbar"  width="100" height="50" style="display: block; margin: 0 auto; vertical-align: middle;">
                    </a>
                </div>

                <!-- DERECHA: Iconos -->
                <div class="navbar-right d-flex justify-content-end align-items-center" style="flex: 1;">
                    <a href="/html/carrito_de_compras.html" class="icon-circle me-2"><i class="bi bi-cart3"></i></a> 
                    <a href="/html/favoritos.html" class="icon-circle me-2"><i class="bi bi-heart"></i></a>
                    <a href="/html/mi_cuenta/inicio_de_sesion.html" class="icon-circle me-3"><i class="bi bi-person"></i></a>
                </div>
            </div>

            <!-- Menú colapsable alineado a la izquierda -->
            <div class="collapse custom-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                <a class="nav-link active rubik-style" aria-current="page" href="../../index.html">INICIO</a>
                </li>
                <li class="nav-item">
                <a class="nav-link active rubik-style" href="/html/productos.html">PRODUCTOS</a>
                </li>
                <li class="nav-item">
                <a class="nav-link active rubik-style" href="/html/sobre_nosotros.html">ACERCA DE</a>
                </li>
            </ul>
            </div>
        </nav>
    `;
    navbarElement.innerHTML = navbarContent;
}

// Función para crear el Footer
function createFooter() {
    let footerElement = document.querySelector("footer");
    const footerContent = `
    <footer>
        <div>
            <div class="footer-section logo-container">
                <div class="logo-image-footer">
                    <img src="https://i.postimg.cc/QxVf15Gq/logo-footer.png" alt="Logo Footer">
                </div>
            </div>
            <div class="footer-section">
                <h4 class="p-0">Categorías</h4>
                <ul>
                    <li><a href="../../index.html">Inicio</a></li>
                    <li><a href="/html/productos.html">Productos</a></li>
                    <li><a href="/html/favoritos.html">Favoritos</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>General</h4>
                <ul class="list-unstyled">
                    <li><a href="/html/sobre_nosotros.html">Acerca de nosotros</a></li>
                    <li><a href="/html/contacto.html">Contáctanos</a></li>
                    <li><a href="/html/terminos_condiciones.html">Términos y condiciones</a></li>
                </ul>
            </div>
            <div class="footer-section contacto-section">
                <h4>Información de contacto</h4>
                <ul class="list-unstyled">
                    <li>Teléfono: +44 55 1728 0466</li>
                    <li>Correo: info@thekingtiger.com</li>
                    <li>Dirección: Calle Principal #123</li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Redes sociales</h4>
                <ul class="list-unstyled">
                    <li>
                        <a href="https://www.facebook.com/thekingtigerMO" target="_blank" rel="noopener noreferrer"
                        style="display: flex; align-items: center; gap: 8px; text-decoration: none; color: inherit;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-facebook" viewBox="0 0 16 16">
                                <path
                                    d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                            </svg>
                            <span>Facebook</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/thekingtiger_mo/" target="_blank" rel="noopener noreferrer"
                        style="display: flex; align-items: center; gap: 8px; text-decoration: none; color: inherit;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-instagram" viewBox="0 0 16 16">
                                <path
                                    d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                            </svg>
                            <span>Instagram</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.threads.com/@thekingtiger_mo" target="_blank" rel="noopener noreferrer"
                        style="display: flex; align-items: center; gap: 8px; text-decoration: none; color: inherit;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                class="bi bi-twitter-x" viewBox="0 0 16 16">
                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                            </svg>
                            <span>Threads</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Formulario de suscripción -->
        <div class="text-center mt-2 mb-2">
            <form class="d-flex justify-content-center flex-wrap">
                <div class="input-group" style="max-width: 400px;">
                <input type="email" class="form-control no-radius text-center" placeholder="Tu correo electrónico" required style="width: 180px; font-size: 0.95rem;">
                <button type="submit" class="btn btn-gray-cool no-radius" style="padding:7px 16px; font-size:0.95rem;">Suscribirse</button>
                </div>
            </form>
        </div>

        <!-- Línea blanca -->
        <hr style="border-top: 1px solid white; margin: 1rem auto 0.5rem auto; width: 85%; max-width: 900px;">

        <!-- Derechos -->
        <p class="store-name text-center text-white mb-1" style="margin-top: 0.5rem;">&copy; ${new Date().getFullYear()} The King Tiger. Todos los derechos reservados.</p>
    </footer>
    `;

    footerElement.innerHTML = footerContent;
}