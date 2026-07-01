# AplicacionFitness Angular

Proyecto Angular con tres versiones dentro de la misma app:

- **v1**: versión original de la aplicación de rutinas.
- **v2**: versión del ejercicio 2 con la versión 2 mejorada.
- **v3**: versión del ejercicio 3 con rutinas, categorías y ejercicios relacionales.

## Enlaces locales

- Versión 1: [http://localhost:4200/](http://localhost:4200/)
- Versión 2: [http://localhost:4200/v2](http://localhost:4200/v2)
- Versión 3: [http://localhost:4200/v3](http://localhost:4200/v3)
- Versión 4: [http://localhost:4200/v4](http://localhost:4200/v4)

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

- `AppRoot` controla la navegación entre la versión 1, la versión 2 y la versión 3.
- Si el puerto `4200` ya está en uso, puedes arrancar en otro puerto con:

  ```bash
  npm start -- --port 4201
  ```

- El tag `v1` en GitHub marca el commit de la versión inicial.
- El tag `v2` en GitHub marca el commit con la versión 2 del ejercicio.
- El tag `v3` en GitHub marca el commit con la versión 3 del ejercicio.
- El tag `v4` en GitHub marcará el commit con la versión 4 del ejercicio multimedia.
