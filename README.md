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

## 🔐 Autenticación con JWT

Sistema de autenticación mediante **JSON Web Tokens (JWT)** usando `@nestjs/jwt` + `@nestjs/passport`.

### Comandos ejecutados

```bash
# 1. Instalar dependencias
npm install @nestjs/jwt @nestjs/passport passport passport-jwt passport-local bcrypt
npm install -D @types/passport-jwt @types/passport-local @types/bcrypt

# 2. Crear módulo auth (independiente, no dentro de biblioteca)
npx nest generate module auth
npx nest generate service auth --no-spec
npx nest generate controller auth --no-spec
```

### Estructura del módulo auth

| Archivo | Descripción |
|---|---|
| [`auth.module.ts`](src/auth/auth.module.ts) | Configura JwtModule, PassportModule, TypeOrmModule para User |
| [`auth.service.ts`](src/auth/auth.service.ts) | Lógica de registro, login y validación de usuarios |
| [`auth.controller.ts`](src/auth/auth.controller.ts) | Endpoints `/auth/register`, `/auth/login`, `/auth/profile` |
| [`entities/user.entity.ts`](src/auth/entities/user.entity.ts) | Entidad User con cifrado automático de password (bcrypt) |
| [`dto/register.dto.ts`](src/auth/dto/register.dto.ts) | DTO para registro (email, password, nombre) |
| [`dto/login.dto.ts`](src/auth/dto/login.dto.ts) | DTO para login (email, password) |
| [`strategies/local.strategy.ts`](src/auth/strategies/local.strategy.ts) | Validación de credenciales (email + password) |
| [`strategies/jwt.strategy.ts`](src/auth/strategies/jwt.strategy.ts) | Extracción y validación del token JWT del header |
| [`guards/jwt-auth.guard.ts`](src/auth/guards/jwt-auth.guard.ts) | Guard que protege rutas con JWT |
| [`guards/local-auth.guard.ts`](src/auth/guards/local-auth.guard.ts) | Guard para login local |

### Endpoints de autenticación

```bash
POST /auth/register    # Registrar nuevo usuario (público)
POST /auth/login       # Iniciar sesión (público) → devuelve access_token
POST /auth/profile     # Ver perfil del usuario autenticado (requiere JWT)
```

### Rutas protegidas en Biblioteca

Las operaciones de escritura (crear, actualizar, eliminar) de autores y libros requieren autenticación JWT:

```bash
# Requieren token JWT en header Authorization: Bearer <token>
POST   /biblioteca/autor          # Crear autor
PUT    /biblioteca/autor/:id      # Actualizar autor
DELETE /biblioteca/autor/:id      # Eliminar autor

POST   /biblioteca/libro          # Crear libro
PUT    /biblioteca/libro/:id      # Actualizar libro
DELETE /biblioteca/libro/:id      # Eliminar libro

# No requieren autenticación (consulta pública)
GET    /biblioteca/autor          # Listar autores
GET    /biblioteca/autor/:id      # Ver autor
GET    /biblioteca/libro          # Listar libros
GET    /biblioteca/libro/:id      # Ver libro
```

### Ejemplo de uso

**Registrar usuario:**
```json
POST /auth/register
{
  "email": "usuario@ejemplo.com",
  "password": "123456",
  "nombre": "Usuario Ejemplo"
}
```

**Iniciar sesión:**
```json
POST /auth/login
{
  "email": "usuario@ejemplo.com",
  "password": "123456"
}
// Respuesta: { "access_token": "eyJhbGciOiJIUzI1NiIs..." }
```

**Crear libro (autenticado):**
```bash
curl -X POST http://localhost:3000/biblioteca/libro \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -d '{"titulo": "NestJS desde cero", "descripcion": "...", "portada": "...", "autorId": 1}'
```

### Variables de entorno adicionales

```env
JWT_SECRET=secreto_super_seguro    # Clave para firmar tokens
JWT_EXPIRES_IN=60m                 # Tiempo de expiración del token
```

> ⚠️ En producción, `JWT_SECRET` debe ser una clave segura y estar en `.env`, nunca en el código.

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
