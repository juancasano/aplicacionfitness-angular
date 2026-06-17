# Módulo: Ejercicios - Implementación

## Archivos

- `exercises.html` — Página para CRUD de ejercicios.
- `app/js/app-exercises.js` — Lógica de la página.

## Patrón

- Usar `api.js` para operaciones CRUD en `exercises`.
- Validaciones: `name` y `category` obligatorios.

## Ejemplo (pseudocódigo)

```js
await api.create('exercises', { name, category, description, level })
```
