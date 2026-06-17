# Módulo: Entrenamientos (Workouts) - Implementación

## 1. Archivos

- `workouts.html` — Página con formulario y lista.
- `app/js/app-workouts.js` — Lógica de la página.

## 2. API usada

- Tabla `workouts` (ver `docs/database.md`).
- Tabla `workout_exercises` para las asociaciones.

## 3. Patrón de implementación

1. Cargar lista de ejercicios desde `exercises` para poblar selector.
2. Cargar workouts del usuario con `getAll('workouts?user_id=...')`.
3. Crear/editar: primero crear/actualizar el `workout`, luego sincronizar `workout_exercises`.

## 4. Manejo de errores

- Uso de `try/catch`; mostrar errores en `#errorDiv` y en consola.

## 5. Ejemplo de llamadas (pseudocódigo)

```js
const workout = await api.create('workouts', { name, duration, user_id })
await api.create('workout_exercises', { workout_id: workout.id, exercise_id, sets, reps })
```
