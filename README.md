# AplicacionFitness Angular

App de gestión de rutinas, categorías y ejercicios en **Angular + TypeScript**.

Es un proyecto **didáctico**: las rutas `v1`…`v9` muestran la evolución del curso. La **app final** (portfolio) es la **v9**, también en `/rutinas`.

## Arranque

```bash
npm install
npm start
```

Abre [http://localhost:4200/](http://localhost:4200/).

## Rutas importantes

| Ruta | Qué es |
|------|--------|
| `/` | Home con mapa de versiones y CTA a la app final |
| `/rutinas` | **App final (v9)** — filtro, edición y borrado |
| `/v1` … `/v9` | Versiones históricas del aprendizaje |

## Progresión v1 → v9

| Versión | Qué aporta |
|---------|------------|
| **v1** | Lista de rutinas + marcar completadas |
| **v2** | Planificador con UI más clara |
| **v3** | Modelo relacional: categorías / ejercicios / rutinas |
| **v4** | UI multimedia / galería visual |
| **v5a** | Rutinas favoritas |
| **v5b** | Desafío diario |
| **v6** | Plan semanal y días completados |
| **v7** | Datos remotos (HttpClient + Supabase REST) |
| **v8** | Formularios reactivos + CRUD en Supabase |
| **v9** | **App final**: pestañas Mis rutinas · Favoritas · Diarias · Semana (+ CRUD/filtro) |

## Supabase (opcional)

Las versiones v7–v9 usan la API REST de Supabase vía `HttpClient`.

1. Copia tus credenciales en [`src/app/config/supabase.config.ts`](src/app/config/supabase.config.ts).
2. Si dejas los placeholders (`tu-proyecto.supabase.co`), la app usa **datos mock locales** para que la UI no falle.

Tablas esperadas: `categorias`, `ejercicios`, `rutinas`.

## Stack

- Angular 22, TypeScript, RxJS
- Reactive Forms, Router, HttpClient
- Supabase REST (opcional) o mock local
