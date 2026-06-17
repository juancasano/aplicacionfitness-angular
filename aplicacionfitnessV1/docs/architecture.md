# Arquitectura técnica - Aplicación Fitness

## 1. Objetivo

Definir la estructura de carpetas, archivos principales y patrones para la app.

## 2. Estructura de carpetas

```text
app/
├── workouts.html
├── exercises.html
├── users.html
├── css/
│   └── styles.css
└── js/
    ├── config.js
    ├── api.js
    ├── ui.js
    ├── app-workouts.js
    ├── app-exercises.js
    └── app-users.js
```

## 3. Principios

- JavaScript puro, sin frameworks.
- Una función común de acceso a la API en `api.js`.
- Manejo de errores con `try/catch` y un `<div>` visible en la UI para mensajes.
- Cada módulo tiene su propia página y archivos JS de orquestación.

## 4. Comunicación con la API

- `config.js` contendrá `BASE_URL` y claves necesarias.
- `api.js` expone funciones genéricas: `getAll(table)`, `getById(table,id)`, `create(table,data)`, `update(table,id,data)`, `del(table,id)`.
- Los módulos usan `api.js` para no duplicar lógica de fetch.

## 5. Convenciones

- Nombres de columnas en DB usan snake_case o camelCase según la fuente (documentar en `database.md`).
- Archivos de módulo: `app-{module}.js` para lógica específica de la página.
