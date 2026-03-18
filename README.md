# Proyecto NestJS + TypeORM — IAW

API REST con NestJS y TypeORM (BD MySQL). El proyecto incluye múltiples CRUD funcionales (recambios, usuarios) tanto en memoria como con base de datos real.

## Módulos implementados

| Módulo                    | Descripción                                                                                | README                                                         |
| ------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| `evaluacion/`             | Tarea: Recurso Evaluación (alumnos, profesores, exámenes, prácticas).                      | [README-RECURSO-EVALUACION.md](./README-RECURSO-EVALUACION.md) |
| `recambios/`              | Almacén (proveedores, piezas, categorías, suministros). Relaciones N:N y tabla intermedia. | [README-RECAMBIOS.md](./README-RECAMBIOS.md)                   |
| `posts/` + `users/`       | Publicaciones. Relación 1:N entre usuario y posts.                                         | [README-MENSAJES.md](./README-MENSAJES.md)                     |
| `products/` + `sizes/`    | Productos con tallas. Relación N:N con tabla intermedia (precio).                          | —                                                              |
| `productos2/` + `tallas/` | Segunda versión completa con TypeORM.                                                      | —                                                              |

## Configuración (`.env`)

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=nestjs_db
DB_SYNC=true
```

## Ejecución

```bash
npm install
npm run start:dev  # Desarrollo
npm run build      # Compilar
npm run start:prod # Producción
```

API en `http://localhost:3000`
