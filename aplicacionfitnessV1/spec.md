# Especificación general - Aplicación Fitness

## 1. Objetivo

Gestionar usuarios, ejercicios y entrenamientos (workouts) en una aplicación web sencilla.

## 2. Módulos

- `Usuarios` — Gestión de usuarios (crear, editar, eliminar, listar).
- `Ejercicios` — Gestión de ejercicios (nombre, categoría, descripción, nivel).
- `Entrenamientos` — Gestión de workouts que agrupan ejercicios (nombre, duracion, ejercicios).

## 3. Reglas globales

- Frontend: HTML/CSS/JavaScript puro.
- Backend/API: Supabase REST API (o API propia); la documentación asume tablas existentes.
- Uso de `fetch` con `async/await`.
- Organización por módulos; cada módulo tiene `Spec.md` y `Implementation.md`.
- Documento `docs/database.md` es la única fuente de verdad sobre tablas y campos.

## 4. Páginas esperadas

- `workouts.html` — Página del módulo Entrenamientos.
- `exercises.html` — Página del módulo Ejercicios.
- `users.html` — Página del módulo Usuarios.

## 5. Criterios de aceptación

- Documentación clara por módulo.
- Implementación esquelética en `app/` para probar las interacciones.
- No se inventan tablas: `docs/database.md` describe lo que existe.
