# Gestión Financiera

Esta aplicación de gestión financiera permite a los usuarios gestionar sus movimientos financieros. La aplicación está construida con React para el frontend y NestJS para el backend.
Todo encapsulado en un solo repositorio.

## Requisitos

- Node.js (versión 23 o superior)
- npm (versión 10 o superior)

## Instalación de dependencias

Para instalar las dependencias del proyecto, ejecuta los siguientes comandos en las carpetas correspondientes:

### Frontend (React)

```bash
npm install
```
### Backend (NestJS)

```bash
cd api
npm install
```
### Iniciar los servidores en local

#### Frontend (React)

Para iniciar el servidor de desarrollo de React, ejecuta el siguiente comando sobre el directorio raíz del proyecto:

```bash
npm run dev
```
El servidor de desarrollo estará disponible en http://localhost:5173.

#### Backend (NestJS)

Para iniciar el servidor de desarrollo de NestJS, ejecuta el siguiente comando sobre el directorio raíz del proyecto:

```bash 
cd api
npm run start:dev
```
El servidor de desarrollo estará disponible en http://localhost:3001.

### Configuración de la base de datos

La aplicación utiliza una base de datos MongoDB que se aloja en una cuenta de MongoCloud Atlas para almacenar los datos de los usuarios y sus movimientos financieros.
La configuración de conexion a la base de datos se encuentra directamente en el código fuente de la aplicación: [api/src/app.module.ts](api/src/app.module.ts).

### Breve explicación de la aplicación

La aplicación de gestión financiera permite a los usuarios:  

- Registrarse e iniciar sesión.
- Ver su capital actual.
- Añadir y eliminar movimientos financieros (ingresos y egresos).
- Ver una lista de todos sus movimientos financieros.
- Cerrar sesión.

El frontend está construido con React y utiliza TailwindCSS para el diseño. El backend está construido con NestJS y proporciona una API REST para gestionar los datos de los usuarios y sus movimientos financieros.

### Build

Para construir la aplicación tanto frontend como api, ejecuta el siguiente comando en la carpeta raíz del proyecto:

```bash
npm run build
cd api
npm run build
```

## Autor

- [Eliana Suancha Guzman](https://github.com/elianisdev)

## Licencia

MIT


