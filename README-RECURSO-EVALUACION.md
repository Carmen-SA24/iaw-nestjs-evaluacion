# Recurso Evaluación

API REST para gestionar Alumnos, Profesores, Prácticas y Exámenes (incluyendo relaciones N:M con campos adicionales de nota y fecha).

---

## 🚀 1. Creación de la Estructura (Comandos CLI)

Para empezar, generé la estructura base de todas las entidades agrupadas dentro de la carpeta `src/evaluacion/` para mantener limpio el proyecto.

### Módulo Raíz Evaluacion

```bash
npx nest generate module evaluacion
```

### Comandos de Recursos (CRUD base sin tests)

Generé las **4 entidades principales**:

```bash
npx nest generate resource evaluacion/alumno --no-spec
npx nest generate resource evaluacion/practica --no-spec
npx nest generate resource evaluacion/profesor --no-spec
npx nest generate resource evaluacion/examen-teorico --no-spec
```

Y luego generé las **3 entidades intermedias** (es necesario hacerlas propias en lugar del clásico `@ManyToMany` de TypeORM, porque mis relaciones N:M tenían datos extra en el esquema, como `nota` y `fecha`):

```bash
npx nest generate resource evaluacion/alumno-realiza-practica --no-spec
npx nest generate resource evaluacion/alumno-hace-examen --no-spec
npx nest generate resource evaluacion/profesor-disena-practica --no-spec
```

> **¿Qué me generó todo esto?**
> Para cada comando, el CLI de NestJS me creó su propia carpeta con su `Módulo`, `Controlador` y `Servicio`, además de dejarme las subcarpetas preparadas para los `DTOs` (con esquemas de validación) y las `Entities`. Todo quedó automáticamente registrado mediante _imports_ dentro de `evaluacion.module.ts`.

---

## 🧠 2. Código e Importaciones Clave (TypeORM)

Para evitar que el _linter_ (ESLint) de mi editor me lanzara falsos positivos y errores por problemas de referencia e importaciones circulares (un clásico al cruzar entidades), añadí la instrucción `/* eslint-disable */` arriba del todo del código de las entidades. Así queda impecable visualmente.

### Ejemplo de Entidad Base: `Alumno`

Un alumno tiene relaciones `1:N` hacia las tablas intermedias, ya que realiza muchas prácticas y muchos exámenes a lo largo del curso.

```typescript
/* eslint-disable */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AlumnoRealizaPractica } from '../../alumno-realiza-practica/entities/alumno-realiza-practica.entity';

@Entity()
export class Alumno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nif: string;

  @Column()
  nombre: string;

  // ... (otros atributos)

  @OneToMany(
    () => AlumnoRealizaPractica,
    (arp: AlumnoRealizaPractica) => arp.alumno,
  )
  alumnoRealizaPracticas: AlumnoRealizaPractica[];
}
```

### Ejemplo de Entidad Intermedia (N:M con datos extra): `AlumnoRealizaPractica`

Aquí intercepto las claves foráneas de `Alumno` y de `Practica`, añado `@JoinColumn` explícito, y declaro los atributos extra que pedía el modelo ER: `fecha` y `nota`.

```typescript
/* eslint-disable */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Alumno } from '../../alumno/entities/alumno.entity';
import { Practica } from '../../practica/entities/practica.entity';

@Entity()
export class AlumnoRealizaPractica {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_alumno' })
  id_alumno: number;

  @Column({ name: 'id_practica' })
  id_practica: number;

  @Column({ type: 'date' })
  fecha: string;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  nota: number;

  @ManyToOne(() => Alumno, (alumno) => alumno.alumnoRealizaPracticas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_alumno' })
  alumno: Alumno;

  @ManyToOne(() => Practica, (practica) => practica.alumnoRealizaPracticas, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_practica' })
  practica: Practica;
}
```

### Configuración en Módulos y DTOs

En los DTOs utilicé **class-validator** (`@IsString`, `@IsNumber`, `@IsNotEmpty`, etc).
También me aseguré de registrar siempre las entidades en su módulo nativo. Por ejemplo, en `AlumnoRealizaPracticaModule`:

```typescript
imports: [TypeOrmModule.forFeature([AlumnoRealizaPractica])];
```

---

## 🧪 3. Guía de Pruebas y Resultados (Postman / Thunder Client)

Al arrancar el servidor (`npm run start:dev`) en local, la base de datos se sincroniza (`synchronize: true`) y crea estas 7 tablas mágicamente en MySQL.

El orden ideal para probarlo (y no fallar por claves foráneas) es crear primero Entidades Simples y luego las Entidades Intermedias para cruzarlos.

### FASE A: Crear Entidades Base (Peticiones POST)

**1. Crear un Alumno** (`POST http://localhost:3000/alumno`):

```json
{
  "nif": "12345678A",
  "grupo": "2ASIR",
  "nombre": "Ana",
  "apellido1": "García",
  "apellido2": "López"
}
```

**2. Crear un Profesor** (`POST http://localhost:3000/profesor`):

```json
{
  "nif": "87654321B",
  "nombre": "Carlos",
  "apellido1": "Martínez",
  "apellido2": "Ruiz"
}
```

**3. Crear una Práctica** (`POST http://localhost:3000/practica`):

```json
{
  "titulo": "Despliegue de Docker en VPS",
  "dificultad": "Alta"
}
```

**4. Crear un Examen Teórico (asociado al profe)** (`POST http://localhost:3000/examen-teorico`):
_Nota: Este endpoint requiere meter la foránea del Profesor que lo diseña (`profesorId`)._

```json
{
  "titulo": "Examen Parcial Kubernetes",
  "numero_preguntas": 20,
  "fecha": "2026-04-15",
  "profesorId": 1
}
```

### FASE B: Cruzar Datos en las Intermedias (Peticiones POST)

**5. Un alumno realiza una práctica y saca nota** (`POST http://localhost:3000/alumno-realiza-practica`):

```json
{
  "id_alumno": 1,
  "id_practica": 1,
  "fecha": "2026-03-10",
  "nota": 8.5
}
```

**6. Un alumno hace un examen con nota** (`POST http://localhost:3000/alumno-hace-examen`):

```json
{
  "id_alumno": 1,
  "id_examen_teorico": 1,
  "nota": 7.2
}
```

### FASE C: Consulta de Tareas con JOIN (Peticiones GET)

**7. Listar todos los alumnos** (`GET http://localhost:3000/alumno`):
Devuelve el listado base estándar.

**8. Ver una nota cruzada** (`GET http://localhost:3000/alumno-realiza-practica`):
_En la respuesta, al haber inyectado TypeORM las relaciones en el array del `find()`, me duevelve el JSON fusionado (lo hace por detrás con un INNER JOIN en MySQL):_

```json
[
  {
    "id": 1,
    "id_alumno": 1,
    "id_practica": 1,
    "fecha": "2026-03-10",
    "nota": "8.50",
    "alumno": {
      "id": 1,
      "nif": "12345678A",
      "grupo": "2ASIR",
      "nombre": "Ana",
      "apellido1": "García",
      "apellido2": "López"
    },
    "practica": {
      "id": 1,
      "titulo": "Despliegue de Docker en VPS",
      "dificultad": "Alta"
    }
  }
]
```

**9. Endpoints personalizados extra que incluí:**
Hice filtros directos con `@Param()` para consultar datos específicos:

- `GET http://localhost:3000/alumno-realiza-practica/alumno/1` → Te saca todo el historial de prácticas de ese Alumno concreto (ID 1).
- `GET http://localhost:3000/alumno-hace-examen/examen/1` → Te lista las notas y nombres de todos los que han hecho ese examen concreto (ID 1).
