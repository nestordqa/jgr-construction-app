# JGR Construction App

Aplicación web para la gestión de tareas de construcción, desarrollada con React, TypeScript y Vite.

##  Características

-  Autenticación de usuarios (Login/Register)
-  CRUD completo de tareas
-  Marcar tareas como completadas
-  Modo edición con bloqueo de acciones
-  Ordenamiento automático por fecha de creación
-  Interfaz moderna y responsive con Tailwind CSS

##  Tecnologías

- **React 19.2** - Biblioteca UI
- **TypeScript 5.9** - Tipado estático
- **Vite 7.2** - Build tool y dev server
- **React Router DOM 7.13** - Enrutamiento
- **Zustand 5.0** - Gestión de estado
- **Axios 1.13** - Cliente HTTP
- **Tailwind CSS 4.1** - Estilos y diseño

##  Requisitos Previos

- Node.js 18+ instalado
- npm o yarn
- Backend API corriendo en `http://localhost:4000`

##  Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/nestordqa/jgr-construction-app
cd jgr-construction-app
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:4000/api
```

>  **IMPORTANTE**: La variable de entorno `VITE_API_URL` es obligatoria para conectar con el backend.

##  Ejecutar el proyecto

### Modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para producción

```bash
npm run build
```

### Preview de producción

```bash
npm run preview
```

El sistema de autenticación utiliza JWT tokens almacenados en localStorage:
- Login de usuarios existentes
- Registro de nuevos usuarios
- Rutas protegidas con redirección automática
- Logout con limpieza de estado

##  Gestión de Tareas

### Funcionalidades:
- **Crear**: Agregar nuevas tareas con título y descripción
- **Editar**: Modificar tareas existentes (modo exclusivo)
- **Eliminar**: Borrar tareas
- **Completar**: Marcar/desmarcar como completadas
- **Ordenamiento**: Automático por fecha de creación (más recientes primero)
