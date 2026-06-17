# Aplicación Fitness V1 — Documentación modular

Ejemplo didáctico de una app web CRUD modular para gestionar ejercicios, entrenamientos y usuarios.

Este proyecto está diseñado como plantilla de documentación y código, con la API de la app separada de la documentación técnica.

---

## Demo pública

- [Ver la app de ejercicios](https://juancasano.github.io/aplicacionfitnessV1/app/exercises.html)
- [Ver el repositorio en GitHub](https://github.com/juancasano/aplicacionfitnessV1)

---

## Qué incluye este proyecto

- `spec.md` — Especificación general de la aplicación.
- `docs/database.md` — Modelo de datos y tablas.
- `docs/architecture.md` — Arquitectura técnica y organización de carpetas.
- `docs/modules/` — Documentación por módulo.
- `app/` — Código HTML/CSS/JS de la aplicación.
- `README.md` — Presentación del proyecto y guía de uso.

---

## Estructura principal

```
aplicacionfitnessV1/
├── README.md
├── spec.md
├── docs/
│   ├── architecture.md
│   ├── database.md
│   └── modules/
│       ├── exercises/
│       ├── workouts/
│       └── users/
├── app/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── api.js
│   │   ├── app-exercises.js
│   │   ├── app-users.js
│   │   ├── app-workouts.js
│   │   ├── config.js
│   │   └── ui.js
│   ├── exercises.html
│   ├── users.html
│   └── workouts.html
├── data/
│   ├── exercises_sample.csv
│   ├── fitness_sample.csv
│   ├── users_sample.csv
│   ├── workout_exercises_sample.csv
│   ├── workouts_sample.csv
│   └── README.md
└── sql/
    ├── README.md
    └── create_tables.sql
```

---

## Cómo usar

1. Clona el repositorio:

```bash
git clone https://github.com/juancasano/aplicacionfitnessV1.git
```

2. Abre la carpeta en tu editor.
3. Abre `app/exercises.html`, `app/users.html` o `app/workouts.html` en el navegador.

> Esta aplicación es una demo estática que usa JavaScript puro y datos locales de ejemplo.

---

## Qué puedes encontrar

- `app/exercises.html` — Gestión de ejercicios.
- `app/users.html` — Gestión de usuarios.
- `app/workouts.html` — Gestión de entrenamientos.
- `app/js/api.js` — Lógica de acceso a datos.
- `app/js/ui.js` — Lógica de interfaz y eventos.
- `app/js/config.js` — Configuración de la app, incluida la clave pública de Supabase.

---

## Documentación técnica

- `docs/architecture.md` describe la organización de carpetas y la arquitectura del proyecto.
- `docs/database.md` explica la estructura de datos y las tablas.
- `docs/modules/` contiene las especificaciones y detalles de implementación de cada módulo:
  - `exercises`
  - `workouts`
  - `users`

---

## Buenas prácticas incluidas

- Documentación separada de la implementación.
- Estructura modular por funcionalidad.
- Uso de archivos CSV de muestra para datos.
- Publicación en GitHub Pages.
- Archivo `.nojekyll` para evitar procesado Jekyll al publicar.

---

## Estado del proyecto

- [x] Código base del front-end.
- [x] Documentación modular.
- [x] Demo en GitHub Pages.
- [ ] Mejoras y versiones futuras: validaciones, diseño, módulo de clientes.

---

## Enlaces rápidos

- App: https://juancasano.github.io/aplicacionfitnessV1/app/exercises.html
- Repo: https://github.com/juancasano/aplicacionfitnessV1

---

## Cómo contribuir

Si quieres mejorar el proyecto, puedes:

1. Crear un fork del repo.
2. Añadir o mejorar documentación en `docs/`.
3. Añadir funcionalidades en `app/js/`.
4. Subir cambios con `git commit` y `git push`.

> Ten cuidado con las claves: no subas claves privadas ni archivos de configuración local.
