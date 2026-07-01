# AplicacionFitness Angular

Proyecto Angular con varias versiones dentro de la misma aplicación:

- **v1**: versión inicial de la aplicación de rutinas.
- **v2**: iteración del ejercicio 2.
- **v3**: versión del ejercicio 3 con rutinas, categorías y ejercicios relacionales.
- **v4**: versión multimedia con ejercicios y componentes visuales.
- **v5a**: versión de rutinas favoritas.
- **v5b**: versión de desafío diario.
- **v6**: versión de control semanal y seguimiento de días.
- **v7**: versión con HttpClient y Supabase usando tablas de `marcas`, `modelos` y `coches`.

## Enlaces locales

- Versión 1: [http://localhost:4200/](http://localhost:4200/)
- Versión 2: [http://localhost:4200/v2](http://localhost:4200/v2)
- Versión 3: [http://localhost:4200/v3](http://localhost:4200/v3)
- Versión 4: [http://localhost:4200/v4](http://localhost:4200/v4)
- Versión 5A: [http://localhost:4200/v5a](http://localhost:4200/v5a)
- Versión 5B: [http://localhost:4200/v5b](http://localhost:4200/v5b)
- Versión 6: [http://localhost:4200/v6](http://localhost:4200/v6)
- Versión 7: [http://localhost:4200/v7](http://localhost:4200/v7)

## Uso

1. Abre la carpeta del proyecto en tu editor.
2. Instala dependencias con:

   ```bash
   npm install
   ```
3. Ejecuta el servidor local con:

   ```bash
   npm start
   ```
4. Abre el navegador en `http://localhost:4200/`.

## v7 - Configuración de Supabase

1. Abre `src/app/config/supabase.config.ts`.
2. Rellena estos valores con tu proyecto de Supabase:

   ```ts
   export const SUPABASE_URL = 'https://TU-PROYECTO.supabase.co';
   export const SUPABASE_ANON_KEY = 'TU_ANON_KEY';
   ```

3. Crea las tablas en Supabase usando `supabase-v7-coches.sql`.
4. Abre `http://localhost:4200/v7` para ver la versión `v7`.

## Navegación actual en la app

- La barra principal muestra ahora las versiones `v4`, `v5a`, `v5b` y `v6`.
- Las versiones anteriores (`v1`, `v2`, `v3`) siguen disponibles por URL directa.

## Notas

- Si el puerto `4200` ya está en uso, arranca en otro puerto con:

  ```bash
  npm start -- --port 4201
  ```

- Los tags Git están definidos como:
  - `v1`
  - `v2`
  - `v3`
  - `v4`
  - `v5a`
  - `v5b`
  - `v6`

- Los tags permiten identificar cada versión del proyecto en GitHub.
