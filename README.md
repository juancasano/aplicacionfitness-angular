# AplicacionFitness Angular

Proyecto Angular con dos versiones dentro de la misma app:

- **v1**: versión original de la aplicación de rutinas.
- **v2**: versión del ejercicio 2 con la versión 2 mejorada.

## Enlaces locales

- Versión 1: [http://localhost:4200/](http://localhost:4200/)
- Versión 2: [http://localhost:4200/v2](http://localhost:4200/v2)

## Uso

1. Si ya tienes la carpeta local del proyecto, ábrela en tu editor.
   Si la estás usando desde GitHub, clona el repositorio primero.
2. Instala dependencias con:

   ```bash
   npm install
   ```
3. Ejecuta el servidor local con:

   ```bash
   npm start
   ```
4. Abre el navegador en `http://localhost:4200/`.

## Notas

- `AppRoot` controla la navegación entre la versión 1 y la versión 2.
- Si el puerto `4200` ya está en uso, puedes arrancar en otro puerto con:

  ```bash
  npm start -- --port 4201
  ```

- El tag `v1` en GitHub marca el commit de la versión inicial.
- El tag `v2` en GitHub marca el commit con la versión 2 del ejercicio.
