# Sistema de Gestión de Recambios (Almacén)

Este es el sistema completo de gestión de recambios que he implementado con NestJS + TypeORM, siguiendo el diagrama de la base de datos de clase.

## � Entidades Implementadas

### 1. **Proveedor**

- `codigo` (PK): Código único del proveedor
- `ciudad`: Ciudad del proveedor
- `direccion`: Dirección del proveedor
- `provincia`: Provincia del proveedor
- **Relación**: `@OneToMany` con ProveedorSuministraPieza

### 2. **Categoria**

- `codigo` (PK): Código único de la categoría
- `nombre`: Nombre de la categoría
- **Relación**: `@OneToMany` con Pieza

### 3. **Pieza**

- `codigo` (PK): Código único de la pieza
- `nombre`: Nombre de la pieza
- `color`: Color de la pieza
- `precio`: Precio de la pieza (decimal 7,2)
- `idCategoria` (FK): Referencia a Categoria
- **Relaciones**:
  - `@ManyToOne` con Categoria
  - `@OneToMany` con ProveedorSuministraPieza

### 4. **ProveedorSuministraPieza** (Tabla Intermedia)

Creé esta tabla como una entidad propia porque la relación N:N necesitaba guardar atributos adicionales:

- `id` (PK): Identificador único
- `codigoProveedor` (FK): Referencia a Proveedor
- `codigoPieza` (FK): Referencia a Pieza
- `fecha`: Fecha de suministro
- `cantidad`: Cantidad suministrada
- **Relaciones**:
  - `@ManyToOne` con Proveedor
  - `@ManyToOne` con Pieza

## 🚀 Endpoints Disponibles

### **Categorías** (`/categoria`)

```bash
POST   /categoria              # Crear categoría
GET    /categoria              # Obtener todas las categorías
GET    /categoria/:id          # Obtener categoría por ID
PUT    /categoria/:id          # Actualizar categoría
DELETE /categoria/:id          # Eliminar categoría
```

### **Piezas** (`/pieza`)

```bash
POST   /pieza                                           # Crear pieza
GET    /pieza                                           # Obtener todas las piezas
GET    /pieza/:id                                       # Obtener pieza por ID
PUT    /pieza/:id                                       # Actualizar pieza
DELETE /pieza/:id                                       # Eliminar pieza
GET    /pieza/consulta/piezas-rojas-proveedor-categoria # Consulta avanzada con QueryBuilder
```

### **Proveedores** (`/proveedor`)

```bash
POST   /proveedor              # Crear proveedor
GET    /proveedor              # Obtener todos los proveedores
GET    /proveedor/:id          # Obtener proveedor por ID
PUT    /proveedor/:id          # Actualizar proveedor
DELETE /proveedor/:id          # Eliminar proveedor
```

### **Proveedor Suministra Pieza** (`/proveedor-suministra-pieza`)

```bash
POST   /proveedor-suministra-pieza     # Registrar suministro
GET    /proveedor-suministra-pieza     # Obtener todos los suministros
GET    /proveedor-suministra-pieza/:id # Obtener suministro por ID
PUT    /proveedor-suministra-pieza/:id # Actualizar suministro
DELETE /proveedor-suministra-pieza/:id # Eliminar suministro
```

## 📝 Ejemplos de Uso que probé

### 1. Crear Categorías

```http
POST http://localhost:3000/categoria
Content-Type: application/json

{
  "codigo": "CAT001",
  "nombre": "Frenos"
}
```

### 2. Crear Proveedores

```http
POST http://localhost:3000/proveedor
Content-Type: application/json

{
  "codigo": "PRO001",
  "ciudad": "Madrid",
  "direccion": "Calle Mayor 123",
  "provincia": "Madrid"
}
```

### 3. Crear Piezas

```http
POST http://localhost:3000/pieza
Content-Type: application/json

{
  "codigo": "PIE001",
  "nombre": "Pastillas de freno delanteras",
  "color": "rojo",
  "precio": 45.50,
  "idCategoria": "CAT001"
}
```

### 4. Registrar Suministros

```http
POST http://localhost:3000/proveedor-suministra-pieza
Content-Type: application/json

{
  "codigoProveedor": "PRO001",
  "codigoPieza": "PIE001",
  "fecha": "2026-03-01",
  "cantidad": 50
}
```

### 5. Consultas

#### Obtener todas las piezas con sus categorías

```http
GET http://localhost:3000/pieza
```

**Respuesta:**

```json
[
  {
    "codigo": "PIE001",
    "nombre": "Pastillas de freno delanteras",
    "color": "rojo",
    "precio": "45.50",
    "idCategoria": "CAT001",
    "categoria": {
      "codigo": "CAT001",
      "nombre": "Frenos"
    }
  }
]
```

#### Consulta avanzada: Piezas rojas con sus proveedores y categorías (QueryBuilder)

Implementé este endpoint para practicar consultas complejas con TypeORM:

```http
GET http://localhost:3000/pieza/consulta/piezas-rojas-proveedor-categoria
```

**Respuesta:**

```json
[
  {
    "proveedor": "PRO001 - Calle Mayor 123",
    "categoria": "CAT001 - Frenos"
  }
]
```

## � Características Técnicas

### Validación de DTOs

Implementé validaciones en todos los DTOs usando `class-validator`:

- `@IsNotEmpty()`: Aseguro que el campo sea obligatorio
- `@IsString()`: Verifico que sea texto
- `@IsNumber()`: Verifico que sea numérico
- `@IsPositive()`: Restrinjo a positivos
- `@IsDateString()`: Compruebo que sea fecha válida

### Relaciones TypeORM

- Configuré la relación **N:1** entre Pieza y Categoria
- Creé la relación **N:N** entre Proveedor y Pieza mediante una tabla intermedia para poder añadir los atributos de fecha y cantidad
- Usé `relations` en los repositorios para cargar los datos anidados

### QueryBuilder Avanzado

En el método `getPiezasRojasProveedorCategoria()` demostré cómo usar:

- `createQueryBuilder()`
- Múltiples `innerJoin`
- Filtros con `where()`
- Selección manual con alias
- `distinct()` y `getRawMany()`
- Transformación y mapeo del resultado

## 🗂️ Estructura de Archivos que generé

```text
src/recambios/
├── categoria/
│   ├── entities/categoria.entity.ts
│   ├── dto/create-categoria.dto.ts ...
├── pieza/ ...
├── proveedor/ ...
└── proveedor-suministra-pieza/ ...
```

## 🎯 Conceptos Aprendidos

1.  Relaciones N:N con tabla intermedia personalizada usando `@ManyToOne` en ambas direcciones
2.  QueryBuilder de TypeORM para hacer un SQL equivalente complejo
3.  Estructurar DTOs para mantener la entrada limpia y validada

**Nota**: He implementado todo este sistema siguiendo las diapositivas 82-88 del curso de TypeORM, incluyendo el ejemplo de consulta avanzada.
