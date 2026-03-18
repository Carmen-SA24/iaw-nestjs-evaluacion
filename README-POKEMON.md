# Guía rápida: CRUD de Pokémon en NestJS (con filtros avanzados)

## 1. Creación del recurso

Para automatizar el proceso utilicé el CLI de NestJS:

```bash
nest generate resource pokemon
```

Respondí afirmativamente a la opción de **REST API**, y el CLI se encargó de generarme los archivos base (module, controller, service, dtos y entity). Luego adapté la entidad para los stats.

---

## 2. Registro

Configuré mi `AppModule` asegurándome de añadir el `PokemonModule` a los imports.

---

## 3. Filtros implementados

Pudiendo jugar con atributos numéricos en las estadísticas, hice estos endpoints de filtrado bajo `http://localhost:3000/pokemon`:

### Listar todos

- **GET** `/pokemon`

### Filtrado por strings

- **GET** `/pokemon/nombre/{nombre}` (Ej: `/pokemon/nombre/Pikachu`)
- **GET** `/pokemon/tipo/{tipo}` (Ej: `/pokemon/tipo/Eléctrico`)

### Filtrado comparativo de estadísticas

- **GET** `/pokemon/hp/mayor/{hp}` (Ej: mayor a 40)
- **GET** `/pokemon/ataque/mayor/{ataque}` (Ej: mayor a 100)
- **GET** `/pokemon/defensa/mayor/{defensa}` (Ej: mayor a 90)
- **GET** `/pokemon/velocidad/mayor/{velocidad}` (Ej: mayor a 120)

---

## 4. Pruebas realizadas

Usé peticiones con Thunder Client / Postman probando la inserción:

```json
{
  "nombre": "Pikachu",
  "tipo": "Eléctrico",
  "hp": 90,
  "ataque": 110,
  "defensa": 70,
  "sp_atk": 100,
  "sp_def": 80,
  "velocidad": 120
}
```

Y luego llamaba de nuevo a los **GET** con los filtros. Es un gran ejercicio para practicar conversiones de tipos (con el `ParseIntPipe`) en memoria.
