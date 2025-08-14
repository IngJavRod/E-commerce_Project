CREATE SCHEMA IF NOT EXISTS thekingtiger;
USE thekingtiger;

CREATE TABLE clientes (
    id_clientes INT PRIMARY KEY AUTO_INCREMENT,
    nom_cliente VARCHAR(45) NOT NULL,
    apellido_cliente VARCHAR(45) NOT NULL,
    correo_cliente VARCHAR(100) NOT NULL UNIQUE,
    direccion_cliente VARCHAR(100),
    telefono_cliente VARCHAR(30) NOT NULL,
    password_cliente VARCHAR(255) NOT NULL
);

CREATE TABLE productos (
    id_productos INT PRIMARY KEY AUTO_INCREMENT,
    nom_prod VARCHAR(100) NOT NULL,
    imagenes TEXT,
    descripcion TEXT NOT NULL,
    chica INT NOT NULL,
    mediana INT NOT NULL,
    grande INT NOT NULL,
    unitalla INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    categoria VARCHAR(45) NOT NULL,
    descuento INT CHECK (descuento >= 0 AND descuento <= 100)
);

CREATE TABLE pedidos (
    id_pedidos INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    total DECIMAL(12,2) NOT NULL,
    pagado TINYINT NOT NULL,
    medio_pago VARCHAR(45) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_clientes)
);

CREATE TABLE carrito (
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    talla CHAR(10) NOT NULL,
    cantidad INT NOT NULL DEFAULT 1,
    PRIMARY KEY (id_pedido, id_producto, talla),
    FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedidos),
    FOREIGN KEY (id_producto) REFERENCES productos(id_productos)
);

CREATE TABLE favoritos (
    id_cliente INT NOT NULL,
    id_producto INT NOT NULL,
    PRIMARY KEY (id_cliente, id_producto),
    FOREIGN KEY (id_cliente) REFERENCES clientes(id_clientes),
    FOREIGN KEY (id_producto) REFERENCES productos(id_productos)
);