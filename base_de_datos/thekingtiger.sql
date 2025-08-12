-- Crear Schema
CREATE SCHEMA IF NOT EXISTS thekingtiger;
USE thekingtiger;

-- Tabla Clientes
CREATE TABLE Clientes (
    idClientes INT PRIMARY KEY AUTO_INCREMENT,
    nomCliente VARCHAR(45) NOT NULL,
    apellidoCliente VARCHAR(45) NOT NULL,
    correoCliente VARCHAR(100) NOT NULL UNIQUE,
    direccionCliente VARCHAR(100) NOT NULL,
    telefonoCliente VARCHAR(30) NOT NULL,
    passwordCliente VARCHAR(255) NOT NULL  -- en producción: almacenar hash
);

-- Tabla Categoria
CREATE TABLE Categoria (
    idCategoria INT PRIMARY KEY AUTO_INCREMENT,
    nomCategoria VARCHAR(45) NOT NULL
);

-- Tabla Tallas
CREATE TABLE Tallas (
    idTalla INT PRIMARY KEY AUTO_INCREMENT,
    nomTalla VARCHAR(10) NOT NULL
);

-- Tabla Productos
CREATE TABLE Productos (
    idProductos INT PRIMARY KEY AUTO_INCREMENT,
    nomProd VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT CHECK (stock >= 0),
    idCategoria INT NOT NULL,
    descuento INT CHECK (descuento >= 0 AND descuento <= 100),
    descripcion TEXT NOT NULL,
    cant INT NOT NULL,
    FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria)
);

-- Tabla intermedia Producto_Talla con PK compuesta
CREATE TABLE Producto_Talla (
    idTalla INT NOT NULL,
    idProducto INT NOT NULL,
    PRIMARY KEY (idTalla, idProducto),
    FOREIGN KEY (idTalla) REFERENCES Tallas(idTalla),
    FOREIGN KEY (idProducto) REFERENCES Productos(idProductos)
);

-- Tabla Imagenes
CREATE TABLE Imagenes (
    idImagen INT PRIMARY KEY AUTO_INCREMENT,
    idProducto INT NOT NULL,
    rutaImagen VARCHAR(255) NOT NULL,
    FOREIGN KEY (idProducto) REFERENCES Productos(idProductos)
);

-- Tabla Pedidos
CREATE TABLE Pedidos (
    idPedidos INT PRIMARY KEY AUTO_INCREMENT,
    idCliente INT NOT NULL,
    total DECIMAL(12,2) NOT NULL,
    pagado TINYINT NOT NULL,
    medioPago VARCHAR(45) NOT NULL,
    FOREIGN KEY (idCliente) REFERENCES Clientes(idClientes)
);

-- Tabla Carrito (detalle de pedido) con PK compuesta
CREATE TABLE Carrito (
    idPedido INT NOT NULL,
    idProducto INT NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    PRIMARY KEY (idPedido, idProducto),
    FOREIGN KEY (idPedido) REFERENCES Pedidos(idPedidos),
    FOREIGN KEY (idProducto) REFERENCES Productos(idProductos)
);

-- Tabla Favoritos con PK compuesta
CREATE TABLE Favoritos (
    idClientes INT NOT NULL,
    idProducto INT NOT NULL,
    PRIMARY KEY (idClientes, idProducto),
    FOREIGN KEY (idClientes) REFERENCES Clientes(idClientes),
    FOREIGN KEY (idProducto) REFERENCES Productos(idProductos)
);

-- Insertar Categorías
INSERT INTO Categoria (nomCategoria) VALUES
('Ropa'),
('Accesorios'),
('Gorras'),
('Juguetes'),
('Hogar');

-- Insertar Tallas
INSERT INTO Tallas (nomTalla) VALUES
('XS'), ('S'), ('M'), ('L'), ('XL');

-- Insertar Clientes
INSERT INTO Clientes (nomCliente, apellidoCliente, correoCliente, direccionCliente, telefonoCliente, passwordCliente) VALUES
('Fer', 'Pérez', 'juan.perez@example.com', 'Calle 1 #123', '5551112222', 'pass123'),
('Manu', 'Gómez', 'maria.gomez@example.com', 'Calle 2 #456', '5553334444', 'pass456'),
('Celeste', 'Martínez', 'luis.mtz@example.com', 'Calle 3 #789', '5555556666', 'pass789'),
('Kari', 'López', 'ana.lopez@example.com', 'Calle 4 #321', '5557778888', 'passabc'),
('Alex', 'Ramírez', 'carlos.ram@example.com', 'Calle 5 #654', '5559990000', 'passxyz'),
('Javi', 'Loera', 'javi.loera@example.com', 'Calle 6 #121', '5557888025', 'passabb'),
('Jona', 'Valles', 'jona.valles@example.com', 'Calle 7 #654', '5559991111', 'passcyz');

-- Insertar Productos
INSERT INTO Productos (nomProd, precio, stock, idCategoria, descuento, descripcion, cant) VALUES
('Playera León', 250.00, 50, 1, 10, 'Playera temática de león', 1),
('Sudadera León', 500.00, 30, 1, 15, 'Sudadera con estampado de león', 1),
('Gorra León', 150.00, 20, 3, 0, 'Gorra negra con logo de león', 1),
('Peluche León', 300.00, 15, 4, 5, 'Peluche suave de león', 1),
('Taza León', 100.00, 40, 5, 0, 'Taza con diseño de león', 1);

-- Relacionar productos con tallas
INSERT INTO Producto_Talla (idTalla, idProducto) VALUES
(1, 1), (2, 1), (3, 2), (4, 2), (5, 3);

-- Insertar Imágenes
INSERT INTO Imagenes (idProducto, rutaImagen) VALUES
(1, 'imagenes/playera_leon_front.jpg'),
(1, 'imagenes/playera_leon_back.jpg'),
(2, 'imagenes/sudadera_leon_frontal.jpg'),
(3, 'imagenes/gorra_leon.jpg'),
(4, 'imagenes/peluche_leon.jpg');

-- Insertar Pedidos
INSERT INTO Pedidos (idCliente, total, pagado, medioPago) VALUES
(1, 250.00, 1, 'Tarjeta'),
(2, 500.00, 0, 'Efectivo'),
(3, 150.00, 1, 'Transferencia'),
(4, 300.00, 1, 'Tarjeta'),
(5, 100.00, 0, 'Efectivo'),
(6, 300.00, 1, 'Tarjeta'),
(7, 100.00, 0, 'Efectivo');

-- Insertar al Carrito
INSERT INTO Carrito (idPedido, idProducto, cantidad) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1),
(6, 4, 2),
(7, 5, 1);

-- Insertar Favoritos
INSERT INTO Favoritos (idClientes, idProducto) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 1),
(5, 4);