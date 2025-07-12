
# ✨ El Rinconcito de Sharpay – Plataforma MERN para comercio electrónico personalizado

Bienvenido al repositorio oficial de **El Rinconcito de Sharpay**, una solución tecnológica desarrollada por estudiantes apasionados por el desarrollo web con el objetivo de digitalizar y automatizar las ventas de un emprendimiento salvadoreño.

---

## 🧑‍💻 Equipo de desarrollo

- **Nombre del Proyecto:** El Rinconcito de Sharpay
- **Integrantes del equipo:**
  - Gabriela Michelle Pérez Portillo – Frontend Developer
  - Daniel Rolando Soriano Solis – Backend Developer
  - German Antonio González Mejía - Full Stack Developer
  - Alessandro Antonio Muñoz Quijada – Diseñador UX/UI
  - Alessandro Imanol Ramírez Morán– Líder de Proyecto 
- **Institución:** Instituto Técnico Ricaldone
- **Especialidad:** Desarrollo de Software 

---

## 🎯 Objetivo del proyecto

Brindar una solución integral que permita al emprendimiento gestionar su catálogo de productos, recibir pedidos personalizados y facilitar la atención al cliente a través de una página web moderna, responsiva y funcional.

---

## 🚩 Problemática detectada

Actualmente, el negocio enfrenta una sobrecarga operativa, ya que solo una persona atiende los pedidos que llegan por distintas redes sociales. Esto provoca que se pierdan ventas debido a mensajes no respondidos o chats desordenados. Además, **no existe un historial digitalizado de ventas ni pedidos personalizados.**

---

## ✅ Solución propuesta

Hemos desarrollado una **plataforma web con frontend y backend propio**, que permite a los clientes:

- Navegar el catálogo completo.
- Personalizar productos sublimables en tiempo real.
- Agregarlos al carrito.
- Pagar con una pasarela de pago segura.

Por otro lado, el equipo administrativo podrá:

- Gestionar productos, pedidos y usuarios.
- Publicar anuncios de eventos de caridad.
- Ver estadísticas de ventas.

---

## ⚙️ Tecnologías utilizadas

### Frontend
- **React.js** – Librería para construir interfaces de usuario.
- **React Router DOM** – Navegación entre páginas.
- **Fabric.js** – Personalizador visual para productos.

### Backend
- **Node.js + Express.js** – Servidor y API RESTful.
- **MongoDB Atlas** – Base de datos NoSQL en la nube.
- **Mongoose** – ODM para interactuar con MongoDB.
- **JWT & Bcrypt** – Autenticación y seguridad.
- **Wompi** – Pasarela de pago para ventas en línea.

---

## Nomenclatura utilizadas
Para mantener la consistencia y evitar errores durante el desarrollo del proyecto, especialmente al integrar frontend y backend, se definieron las siguientes convenciones de nombres:

Backend (Node.js + Express.js)
Se utilizó lowerCamelCase en la definición de nombres de variables, funciones, controladores y modelos.
Esta convención es estándar en entornos JavaScript y facilita la lectura del código al seguir el estilo común de la comunidad Node.js.

Frontend (React.js)
Se usó una combinación de lowerCamelCase y UpperCamelCase:

Para nombres de variables, hooks y funciones se empleó lowerCamelCase.


Para nombres de componentes, páginas y archivos CSS se utilizó UpperCamelCase (PascalCase).


Esta decisión se tomó para evitar conflictos con JSX, ya que React interpreta los nombres que comienzan en minúscula como elementos HTML nativos. Además, separar visualmente los componentes de funciones comunes mejora la mantenibilidad del proyecto.

