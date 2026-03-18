# Guía rápida: CRUD de películas en NestJS (con filtros avanzados)

## 1. Creación del recurso

Desde la raíz del proyecto ejecuté el siguiente comando para generar la estructura base de golpe:

```bash
nest generate resource peliculas
```

Seleccioné **REST API** y esto me generó automáticamente:

- Módulo (`peliculas.module.ts`)
- Controlador (`peliculas.controller.ts`)
- Servicio (`peliculas.service.ts`)
- DTOs (`create-pelicula.dto.ts`, `update-pelicula.dto.ts`)
- Entidad (`pelicula.entity.ts`)

Solo tuve que editar los archivos para ajustar los campos y la lógica a mis necesidades en memoria.

---

## 2. Registro del módulo

Me aseguré de importar `PeliculasModule` en el array de imports de mi `AppModule`.

---

## 3. Filtros que desarrollé

Supón que la API arranca en `http://localhost:3000/peliculas`. Estos son los endpoints de filtrado que programé:

### Listar todas las películas

- **GET** `http://localhost:3000/peliculas`

### Buscar por título exacto

- **GET** `http://localhost:3000/peliculas/title/{title}`
  - Ejemplo: `http://localhost:3000/peliculas/title/La La Land`

### Buscar por director

- **GET** `http://localhost:3000/peliculas/director/{director}`
  - Ejemplo: `http://localhost:3000/peliculas/director/Steve McQueen`

### Buscar por año mayor a un valor

- **GET** `http://localhost:3000/peliculas/year-greater/{year}`
  - Ejemplo: `http://localhost:3000/peliculas/year-greater/2010`

### Buscar por año menor a un valor

- **GET** `http://localhost:3000/peliculas/year-less/{year}`
  - Ejemplo: `http://localhost:3000/peliculas/year-less/2010`

### Buscar por duración mayor a un valor

- **GET** `http://localhost:3000/peliculas/length-greater/{length}`
  - Ejemplo: `http://localhost:3000/peliculas/length-greater/100`

### Buscar por duración menor a un valor

- **GET** `http://localhost:3000/peliculas/length-less/{length}`
  - Ejemplo: `http://localhost:3000/peliculas/length-less/100`

---

## 4. Cómo lo probé (Thunder Client / Postman)

Creé peticiones **POST** pasándole JSON con este formato:

```json
{
  "title": "La La Land",
  "director": "Steve McQueen",
  "year": 2010,
  "length_minutes": 81
}
```

Y luego ejecuté todas las comprobaciones **GET** probando cada uno de los filtros por URL. Básicamente un CRUD apoyado 100% en métodos de array filtrando en memoria.
