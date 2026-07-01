# AplicacionFitness Angular

Proyecto Angular con varias versiones dentro de la misma aplicación:

- **v1**: versión inicial de la aplicación de rutinas.
- **v2**: iteración del ejercicio 2.
- **v3**: versión del ejercicio 3 con rutinas, categorías y ejercicios relacionales.
- **v4**: versión multimedia con ejercicios y componentes visuales.
- **v5a**: versión de rutinas favoritas.
- **v5b**: versión de desafío diario.
- **v6**: versión de control semanal y seguimiento de días.
- **v7**: versión con **HttpClient + Supabase** - Datos reales desde API REST (no mock).

## 🔄 Cambios en v7

La versión 7 conecta la aplicación con **Supabase** usando **HttpClient**:

- ✅ Los datos vienen de tablas reales en Supabase (no de arrays mock)
- ✅ Implementado `ngOnInit()` para cargar datos al iniciar
- ✅ Signals inicialmente vacías, se actualizan cuando llegan los datos
- ✅ Mensajes de carga y error
- ✅ Métodos async en el servicio usando `firstValueFrom()`

### Tablas creadas en Supabase

1. `categorias` — categorías de ejercicios
2. `ejercicios` — ejercicios con referencia a categoría
3. `rutinas` — rutinas de entrenamiento
4. `workout_ejercicios` — relación entre rutinas y ejercicios

### Configuración necesaria

Antes de ejecutar v7, configura tus credenciales de Supabase:

```bash
# Edita este archivo con tus valores
src/app/config/supabase.config.ts

export const SUPABASE_URL = 'https://TU-PROYECTO.supabase.co';
export const SUPABASE_ANON_KEY = 'TU_ANON_KEY';
```

Consulta [INSTRUCCIONES-V7.md](./INSTRUCCIONES-V7.md) para guía detallada.

## Enlaces locales

- Versión 1: [http://localhost:4200/](http://localhost:4200/)
- Versión 2: [http://localhost:4200/v2](http://localhost:4200/v2)
- Versión 3: [http://localhost:4200/v3](http://localhost:4200/v3)
- Versión 4: [http://localhost:4200/v4](http://localhost:4200/v4)
- Versión 5A: [http://localhost:4200/v5a](http://localhost:4200/v5a)
- Versión 5B: [http://localhost:4200/v5b](http://localhost:4200/v5b)
- Versión 6: [http://localhost:4200/v6](http://localhost:4200/v6)
- Versión 7: [http://localhost:4200/](http://localhost:4200/) (default, requiere Supabase)

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
  - `v7` — HttpClient + Supabase

- Los tags permiten identificar cada versión del proyecto en GitHub.

## Tecnología

- **Angular 19+** — Framework principal
- **Signals** — Gestión de estado reactivo
- **HttpClient** — Peticiones HTTP (desde v7)
- **Supabase** — Base de datos backend (desde v7)
- **TypeScript** — Lenguaje de programación
