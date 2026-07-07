# AplicacionFitness Angular

Proyecto Angular de Fitness Manager. Esta app gestiona rutinas, categorías y ejercicios, y ahora incluye la versión final `v1.0` junto con los tags históricos.

## Versiones

- **v1**: versión inicial histórica de la aplicación de rutinas.
- **v1.0**: release final de la aplicación de fitness.
- **v2**: iteración del ejercicio 2.
- **v3**: versión del ejercicio 3 con rutinas, categorías y ejercicios relacionales.
- **v4**: versión multimedia con ejercicios y componentes visuales.
- **v5a**: versión de rutinas favoritas.
- **v5b**: versión de desafío diario.
- **v6**: versión de control semanal y seguimiento de días.
- **v7**: versión con HttpClient y Supabase usando tablas de `categorias`, `ejercicios` y `rutinas`.
- **v8**: Fitness Manager con formulario reactivo y gestión completa de rutinas en Supabase.
- **v9**: versión con filtrado por categoría, edición y borrado de rutinas.

## Enlaces locales

- Versión 1: [http://localhost:4200/](http://localhost:4200/)
- Versión 2: [http://localhost:4200/v2](http://localhost:4200/v2)
- Versión 3: [http://localhost:4200/v3](http://localhost:4200/v3)
- Versión 4: [http://localhost:4200/v4](http://localhost:4200/v4)
- Versión 5A: [http://localhost:4200/v5a](http://localhost:4200/v5a)
- Versión 5B: [http://localhost:4200/v5b](http://localhost:4200/v5b)
- Versión 6: [http://localhost:4200/v6](http://localhost:4200/v6)
- Versión 7: [http://localhost:4200/v7](http://localhost:4200/v7)
- Versión 8: [http://localhost:4200/v8](http://localhost:4200/v8)
- Versión 9: [http://localhost:4200/v9](http://localhost:4200/v9)

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
