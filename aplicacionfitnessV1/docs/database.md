# Base de datos - Aplicación Fitness

Este documento es la fuente única de verdad sobre las tablas existentes.

## Resumen de tablas

| Tabla | Descripción |
|---|---|
| `users` | Usuarios de la aplicación |
| `exercises` | Ejercicios disponibles |
| `workouts` | Entrenamientos creados por usuarios |
| `workout_exercises` | Relación N:N entre workouts y exercises |

## Tabla `users`

| Campo | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | `bigint` | Primary Identity | Identificador único |
| `name` | `varchar` | Not null | Nombre del usuario |
| `email` | `varchar` | Not null, unique | Correo del usuario |

## Tabla `exercises`

| Campo | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | `bigint` | Primary Identity | Identificador único |
| `name` | `varchar` | Not null | Nombre del ejercicio |
| `category` | `varchar` | Not null | Categoría (fuerza, cardio, mobility, etc.) |
| `description` | `text` | Nullable | Descripción o instrucciones |
| `level` | `varchar` | Nullable | Nivel: beginner/intermediate/advanced |

## Tabla `workouts`

| Campo | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | `bigint` | Primary Identity | Identificador único |
| `name` | `varchar` | Not null | Nombre del entrenamiento |
| `duration` | `int` | Not null | Duración estimada en minutos |
| `user_id` | `bigint` | Not null, foreign key -> `users.id` | Creador del workout |

## Tabla `workout_exercises`

| Campo | Tipo | Restricciones | Descripción |
|---|---|---|---|
| `id` | `bigint` | Primary Identity | Identificador único |
| `workout_id` | `bigint` | Not null, foreign key -> `workouts.id` |
| `exercise_id` | `bigint` | Not null, foreign key -> `exercises.id` |
| `sets` | `int` | Nullable | Series recomendadas |
| `reps` | `int` | Nullable | Repeticiones por serie |

## Relaciones

- Un `user` puede tener muchos `workouts`.
- Un `workout` puede contener muchos `exercises` (N:N via `workout_exercises`).

> Pendiente: confirmar tipos exactos y nombres de columnas en la base de datos real.
