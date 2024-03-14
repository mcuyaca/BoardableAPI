# Boardable

## Descripción

Boardable es una aplicación Full Stack diseñada para la gestión de tareas y proyectos de manera colaborativa, inspirada en la funcionalidad de Trello. Permite a los usuarios registrados crear tableros personalizados, agregar tarjetas con tareas y colaborar con otros miembros del equipo en tiempo real.

## Tabla de contenidos

- [Funcionalidades](#funcionalidades)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Funcionalidades

- **Autenticación de Usuario:**
  - Inicio de sesión con nombre de usuario.
  - Persistencia de sesión para acceso directo a la vista principal.

- **Tableros Personalizados:**
  - Los usuarios pueden crear tableros personalizados para organizar sus proyectos y tareas.
  - Se pueden agregar listas y tarjetas a cada tablero para una mejor organización.

- **Gestión de Tareas:**
  - Las tarjetas pueden contener descripciones detalladas, listas de verificación, fechas límite y etiquetas para facilitar la gestión de tareas.
  - Se pueden establecer el estado de cada tarea (pendiente, en progreso, completada).

## Tecnologías

- Frontend: React, Typescript, TailwindCSS
- Backend: NodeJS, Typescript, Express
- Base de datos : PostgreSQL
- Autenticación/Autorización: JSON Web Tokens
- Testing: Vitest

## Instalación

1. Clona este repositorio: `git clone https://github.com/mcuyaca/Boardable.git`
2. Instala las dependencias: `npm install`
3. Inicia la aplicación: `npm start`

## Contribución

Si deseas contribuir a CodeableKeep, sigue estos pasos:

1. Crea un fork del repositorio.
2. Crea tu rama de características: `git checkout -b feature/NuevaCaracteristica`
3. Realiza tus cambios y haz commit: `git commit -m 'Añade NuevaCaracteristica'`
4. Sube tus cambios: `git push origin feature/NuevaCaracteristica`
5. Crea un Pull Request en GitHub.

## Licencia

Este proyecto está bajo la Licencia MIT.
