document.addEventListener("DOMContentLoaded", () => {
    createFooter()
    createNavbar()
})

// Función para crear el Navbar
function createNavbar() {
    const navbarElement = document.querySelector('header');
    const navbarContent = `
    <nav class="navbar fixed-top">
        <div class="container-fluid d-flex justify-content-between align-items-center">

            <!-- Botón hamburguesa a la izquierda -->
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Logo al centro -->
            <a class="navbar-brand mx-auto" href="#">
            <img src="https://i.postimg.cc/NGdNKDVM/logo-navbar.png" alt="Logo" height="50">
            </a>


            <!-- Iconos a la derecha -->
            <div class="d-flex align-items-center">
            <a href="#" class="icon-circle me-2">
                <i class="bi bi-cart3"></i>
            </a>
            <a href="#" class="icon-circle me-2">
                <i class="bi bi-heart"></i>
            </a>
            <a href="#" class="icon-circle me-3">
                <i class="bi bi-person"></i>
            </a>
            </div>

            <!-- Offcanvas Menu -->
            <div class="offcanvas offcanvas-start custom-barra-bg" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div class="offcanvas-header">
                    <h2 class="offcanvas-title caption-style" id="offcanvasNavbarLabel">Menú</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                        <li class="nav-item">
                            <a class="nav-link active rubik-style fs-4" aria-current="page" href="index.html">Inicio</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle rubik-style fs-4" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Productos</a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">Todos los productos</a></li>
                                <li><a class="dropdown-item" href="#">Gorros</a></li>
                                <li><a class="dropdown-item" href="#">Camisas</a></li>
                                <li><a class="dropdown-item" href="#">Sudaderas</a></li>
                                <li><a class="dropdown-item" href="#">Pantalones</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="#">Accesorios</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link rubik-style fs-4" href="#">Acerca de</a>
                        </li>
                    </ul>
                </div>
            </div>
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
                <ul class="">
                    <li><a href="index.html">Inicio</a></li>
                    <li><a href="#">Productos</a></li>
                    <li><a href="#">Accesorios</a></li>
                    <li><a href="#">Ofertas</a></li>
                    <li><a href="#">Descuentos</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>General</h4>
                <ul class="list-unstyled">
                    <li><a href="#">Sobre nosotros</a></li>
                    <li><a href="#">Contáctanos</a></li>
                    <li><a href="#">Términos y condiciones</a></li>
                    <li><a href="#">Política de privacidad</a></li>
                </ul>
            </div>
            <div class="footer-section contacto-section">
                <h4>Información de contacto</h4>
                <ul class="list-unstyled">
                    <li>Teléfono: +123 456 7890</li>
                    <li>Correo: info@thekingtiger.com</li>
                    <li>Dirección: Calle Principal #123</li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Redes sociales</h4>
                <ul class="list-unstyled">
                    <li><a href="https://www.facebook.com/thekingtigerMO" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                    <li><a href="https://www.instagram.com/thekingtiger_mo/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                    <li><a href="https://www.threads.com/@thekingtiger_mo" target="_blank" rel="noopener noreferrer">Twitter/X</a></li>
                </ul>
            </div>
        </div>

        <!-- Formulario de suscripción -->
        <div class="text-center mt-4">
            <form class="d-flex justify-content-center flex-wrap">
                <div class="input-group" style="max-width: 600px;">
                <input type="email" class="form-control no-radius" placeholder="Tu correo electrónico" required>
                <button type="submit" class="btn btn-gray-cool no-radius">Suscribirse</button>
                </div>
            </form>
        </div>


        <!-- Línea blanca -->
        <hr style="border-top: 2px solid white; margin: 2rem auto; width: 90%; max-width: 1200px;">

        <!-- Derechos -->
        <p class="store-name text-center text-white mb-0">&copy; ${new Date().getFullYear()} The King Tiger. Todos los derechos reservados.</p>
    </footer>
    `;

    footerElement.innerHTML = footerContent;
}
