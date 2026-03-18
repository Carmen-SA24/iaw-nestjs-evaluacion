# Mensajes — Instrucciones y pasos realizados

En este módulo documenté los pasos que di para crear el recurso "mensajes" (posts) desde la terminal y la estructura que se generó.

## 1. Requisitos

- Instalé Node.js y npm
- Creé el proyecto inicial de NestJS
- Configuré TypeORM para la conexión a la base de datos

## 2. Comandos ejecutados en la terminal

Instalé el CLI de NestJS:

```bash
npm i -g @nestjs/cli
```

Generé el módulo, controlador y servicio para los posts:

```bash
npx nest g module posts
npx nest g controller posts --no-spec
npx nest g service posts --no-spec
```

Creé las carpetas manualmente para DTOs y entidades:

```bash
mkdir -p src/posts/dto src/posts/entities
# O con PowerShell:
# New-Item -ItemType Directory -Path src\posts\dto -Force
```

Archivos esenciales que creé:

```text
src/posts/dto/create-post.dto.ts
src/posts/dto/update-post.dto.ts
src/posts/entities/post.entity.ts
src/posts/posts.controller.ts
src/posts/posts.service.ts
src/posts/posts.module.ts
```

## 3. Contenido de los archivos

- `create-post.dto.ts`: Definí campos como `title`, `content`, `userId` añadiendo validaciones de `class-validator`.
- `update-post.dto.ts`: Usé `PartialType(CreatePostDto)` para permitir actualizaciones parciales.
- `post.entity.ts`: Creé la entidad con las columnas `id`, `title`, `content`, `publicado` y la relación `@ManyToOne` con `User`.
- `posts.controller.ts`: Implementé los endpoints CRUD básicos (GET, POST, PUT, DELETE) y un endpoint específico `GET /posts/user/:userId`.
- `posts.service.ts`: Escribí la lógica inyectando el repositorio `@InjectRepository(Post)`.

## 4. Pruebas realizadas

Para arrancar la API ejecuté:

```bash
npm run start:dev
```

Y probé a crear un post usando este comando:

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Prueba","content":"Texto","userId":1}'
```

## 5. Implementación en este repo

- [src/posts/](src/posts) : Módulo, controlador y servicio que hice para posts.
- [src/users/](src/users) : Módulo de usuarios; donde relacioné `User` con `Post` (1 a muchos).

## 6. Conclusiones sobre la relación N:N

Aunque en este módulo hice 1:N, dejé la nota para cuando hiciera N:N:

- Usar `@ManyToMany` con `@JoinTable()` es lo ideal para tablas sin campos extra.
- Si la relación necesita extras, demostré que se debe hacer una entidad propia como hice en `ProductSize`.
