# API NestJS - Proyecto de Aprendizaje

API REST desarrollada con **NestJS 11** + **TypeORM** + **MySQL** durante el curso de **Implantación de Aplicaciones Web (IAW)**.

---

## 📌 Módulo Actual: Biblioteca

API para gestionar una biblioteca con **Autores** y **Libros** (relación 1:N).

### Comandos ejecutados

```bash
# 1. Crear módulo raíz biblioteca
npx nest generate module biblioteca

# 2. Crear recurso autor dentro de biblioteca
npx nest generate resource biblioteca/autor --no-spec

# 3. Crear recurso libro dentro de biblioteca
npx nest generate resource biblioteca/libro --no-spec
```

### Entidades

| Entidad | Endpoint | Descripción |
|---|---|---|
| `Autor` | `/biblioteca/autor` | CRUD de autores |
| `Libro` | `/biblioteca/libro` | CRUD de libros (relacionados con autor) |

### Endpoints

```bash
POST   /biblioteca/autor          # Crear autor
GET    /biblioteca/autor          # Listar todos los autores
GET    /biblioteca/autor/:id      # Buscar autor por ID
PUT    /biblioteca/autor/:id      # Actualizar autor
DELETE /biblioteca/autor/:id      # Eliminar autor

POST   /biblioteca/libro          # Crear libro (requiere autorId)
GET    /biblioteca/libro          # Listar todos los libros (con autor)
GET    /biblioteca/libro/:id      # Buscar libro por ID (con autor)
PUT    /biblioteca/libro/:id      # Actualizar libro
DELETE /biblioteca/libro/:id      # Eliminar libro
```

### Ejemplos de uso

**Crear autor:**
```json
POST /biblioteca/autor
{
  "nombre": "Domingo",
  "biografia": "Profesor TFP en el IES. Curro Valera",
  "foto": "https://ejemplo.com/avatar.jpg"
}
```

**Crear libro:**
```json
POST /biblioteca/libro
{
  "titulo": "Aprende NestJS como si estuviera en primero",
  "descripcion": "Contenido de la materia",
  "portada": "https://ejemplo.com/portada.jpg",
  "autorId": 1
}
```

### ⚠️ Nota sobre las rutas

Los controladores usan `@Controller('biblioteca/autor')` y `@Controller('biblioteca/libro')`. En el video el profesor inicialmente los creó sin el prefijo `biblioteca/` y luego tuvo que corregirlo. Nuestra implementación ya tiene las rutas correctas.

---

## 🔐 Próximo tema: Autenticación con JWT

El profesor introducirá **JSON Web Tokens (JWT)** para:
- Control de acceso por perfiles (admin vs usuario normal)
- Generación de tokens firmados al hacer login
- Protección de rutas de administración
- Uso del header `Authorization` en las peticiones

Librería a instalar: `@nestjs/jwt` y `@nestjs/passport`

---

## 📚 Módulos Anteriores

### Evaluación (recurso de evaluación)

Sistema de gestión educativa con 7 entidades bajo [`src/evaluacion/`](src/evaluacion/).

**Entidades base (CRUD):**
- [`Alumno`](src/evaluacion/alumno/) — `GET/POST/PUT/DELETE /alumno`
- [`Profesor`](src/evaluacion/profesor/) — `GET/POST/PUT/DELETE /profesor`
- [`Practica`](src/evaluacion/practica/) — `GET/POST/PUT/DELETE /practica`
- [`ExamenTeorico`](src/evaluacion/examen-teorico/) — `GET/POST/PUT/DELETE /examen-teorico` (con FK a Profesor)

**Entidades intermedias (N:M con datos extra):**
- [`AlumnoRealizaPractica`](src/evaluacion/alumno-realiza-practica/) — `GET/POST/PUT/DELETE /alumno-realiza-practica` + filtro `GET .../alumno/:idAlumno`
- [`AlumnoHaceExamen`](src/evaluacion/alumno-hace-examen/) — `GET/POST/PUT/DELETE /alumno-hace-examen`
- [`ProfesorDisenaPractica`](src/evaluacion/profesor-disena-practica/) — `GET/POST/PUT/DELETE /profesor-disena-practica`

### Recambios (almacén)

Sistema de gestión de recambios con 4 entidades bajo [`src/recambios/`](src/recambios/):
- [`Categoria`](src/recambios/categoria/) — CRUD
- [`Pieza`](src/recambios/pieza/) — CRUD + consulta avanzada con QueryBuilder
- [`Proveedor`](src/recambios/proveedor/) — CRUD
- [`ProveedorSuministraPieza`](src/recambios/proveedor-suministra-pieza/) — CRUD (N:N con datos extra)

### Otros módulos de práctica

- [`posts`](src/posts/) — CRUD de posts con relación 1:N a users
- [`users`](src/users/) — CRUD de usuarios
- [`products`](src/products/) — CRUD de productos
- [`sizes`](src/sizes/) — CRUD de tallas
- [`product-size`](src/product-size/) — Relación N:N producto-talla
- [`productos2`](src/productos2/) — CRUD de productos (versión 2)
- [`tallas`](src/tallas/) — CRUD de tallas (versión 2)
- [`mensajes`](src/mensajes/) — Módulo de mensajes

---

## 🚀 Arranque del proyecto

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno (copiar y rellenar)
cp .env.example .env

# Arrancar en modo desarrollo
npm run start:dev
```

El servidor arranca en `http://localhost:3000` (o el puerto configurado en `PORT`).

### Variables de entorno (`.env`)

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=nombre_bd
DB_SYNC=true    # true en desarrollo, false en producción
```

> ⚠️ Asegúrate de tener `DB_SYNC=true` en desarrollo para que TypeORM cree/actualice las tablas automáticamente.

---

## 🛠️ Stack Tecnológico

- **Framework:** NestJS 11
- **ORM:** TypeORM 0.3
- **Base de datos:** MySQL (driver `mysql2`)
- **Validación:** `class-validator` + `class-transformer`
- **Configuración:** `@nestjs/config`
- **CORS:** Habilitado para `http://localhost:3000` (frontend Next.js)
