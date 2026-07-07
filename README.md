# AplicacionFitness Angular

Proyecto Angular de Fitness Manager. Esta app gestiona rutinas, categorías y ejercicios, y está diseñada para mostrar la versión final `v1.0` de la aplicación de fitness.

## Estado del repositorio

- **v1**: versión inicial histórica de la aplicación de rutinas.
- **v1.0**: release final de la aplicación de fitness, que consolida la entrega actual.
- También existen tags históricos de desarrollo (`v2` a `v9`).

## Enlaces locales

- App principal (release actual): [http://localhost:4200/](http://localhost:4200/)
- Si usas versiones anteriores, añade el sufijo correspondiente (`/v2`, `/v3`, etc.).

## Release v1.0

Esta versión final se publica como `v1.0`.
Asegúrate de configurar tus credenciales de Supabase en `src/app/config/supabase.config.ts` antes de ejecutar la aplicación.

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

## Notas importantes

- Esta aplicación es un proyecto de fitness, no un proyecto de gestión de coches.
- Mantén los tags `v1` y `v1.0` para distinguir la versión histórica de la versión final.
- Si el puerto `4200` está ocupado, usa:

  ```bash
  npm start -- --port 4201
  ```
