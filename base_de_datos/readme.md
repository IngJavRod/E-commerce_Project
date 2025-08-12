# 🐯 Base de Datos - The King Tiger (E-commerce)

Este documento describe la estructura y el contenido de la base de datos utilizada en el proyecto **The King Tiger**, una tienda en línea especializada en ropa urbana.

Incluye:

- Script de creación de la base de datos con relaciones y llaves foráneas.
- Datos de prueba (mínimo 5 registros por tabla).
- Diagrama entidad-relación (ERD) exportado desde MySQL Workbench.

---

## 📁 Estructura de esta carpeta

```
/base_de_datos/
├── thekingtiger.sql      # Script completo: creación + inserts
├── diagrama.mwb          # Archivo del diagrama de Workbench
├── diagrama.png          # Diagrama ERD exportado como imagen
└── README.md             # Este archivo
```

---

## ⚙️ ¿Cómo ejecutar el script?

### Opción 1: Usando MySQL Workbench
1. Abre `thekingtiger.sql` en MySQL Workbench.
2. Ejecuta todo el script (⚠️ asegúrate de tener permisos suficientes).
3. Verifica que se haya creado el esquema `thekingtiger` y todas sus tablas.

### Opción 2: Usando consola o Git Bash

```bash
mysql -u tu_usuario -p < thekingtiger.sql
```
Reemplaza `tu_usuario` por tu usuario de MySQL. Se te pedirá tu contraseña.

---

## 📦 Tablas creadas

- **Clientes**: Usuarios registrados.
- **Categoria**: Categorías de productos (ej. Ropa, Juguetes).
- **Tallas**: Tallas disponibles.
- **Productos**: Artículos en venta.
- **Producto_Talla**: Relación muchos a muchos entre productos y tallas.
- **Imagenes**: Imágenes asociadas a productos.
- **Pedidos**: Compras realizadas por clientes.
- **Carrito**: Detalle de productos por pedido.
- **Favoritos**: Productos marcados como favoritos por los clientes.

---

## 🧪 Datos de ejemplo

Se incluyen al menos 5 registros en cada una de las siguientes tablas:

- Clientes
- Categoría
- Tallas
- Productos
- Producto_Talla
- Imágenes
- Pedidos
- Carrito
- Favoritos

Esto permite probar el sistema con datos realistas desde el inicio.

---

## 🔐 Notas de seguridad

⚠️ Las contraseñas de clientes están almacenadas como texto plano en el campo `passwordCliente`, solo con fines demostrativos.  
**En un entorno real deben almacenarse usando un hash seguro (como bcrypt).**

---

## 🖼️ Diagrama ERD

El archivo `diagrama.png` contiene el Diagrama Entidad-Relación (EER) exportado desde MySQL Workbench.  
Este diagrama visualiza las relaciones entre todas las tablas y sus llaves foráneas.


---

## ✅ Requisitos técnicos

- MySQL 8.0 o superior (para soporte de CHECK, claves foráneas, etc.).
- Cliente como MySQL Workbench o consola (`mysql`).

---

## ✍️ Autor

- **Nombre:** Team FireStack
- **Proyecto:** The King Tiger - E-commerce Final Project
