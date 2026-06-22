# Guía para agentes (Cursor)

Proyecto didáctico: aplicación CRUD de **usuarios**, **ejercicios** y **entrenamientos** con HTML, JavaScript puro y una API REST.

Visión general e índice de documentación → [README.md](./README.md)

## Antes de modificar código

1. Identifica el **módulo** afectado: Usuarios, Ejercicios o Entrenamientos.
2. Lee las reglas globales en [spec.md](./spec.md).
3. Lee la spec del módulo: `docs/modules/<modulo>/<modulo>Spec.md`.
4. Si vas a tocar código, lee también `docs/modules/<modulo>/<modulo>Implementation.md`.
5. Para estructura de carpetas, clases o HTML → [docs/architecture.md](./docs/architecture.md).
6. Para tablas o campos de BD → [docs/database.md](./docs/database.md).

No repitas información entre documentos. Principio explicado en [docs/fuente-unica-verdad.md](./docs/fuente-unica-verdad.md).

## Estructura del código

```text
app/
├── exercises.html, users.html, workouts.html
├── css/styles.css
└── js/
    ├── api.js, ui.js
    ├── app-exercises.js, app-users.js, app-workouts.js
    ├── config.example.js   ← plantilla (sí en repo)
    ├── config.js           ← claves reales (NO tocar ni commitear)
```

## Restricciones técnicas (resumen)

- JavaScript puro, sin frameworks ni Node.js.
- Uso de `fetch` con `async/await`.
- Una página HTML independiente por módulo.
- Errores tratados con `try/catch`, `console.error` y mensajes visibles en la UI.
- Cambios mínimos: solo lo necesario para la tarea.

## Después de cada cambio

Actualiza **solo** los documentos afectados:

| Tipo de cambio | Archivos a revisar |
|---|---|
| Funcionalidad de un módulo | `*Spec.md` del módulo |
| Código o archivos tocados | `*Implementation.md` del módulo |
| Tablas o relaciones | `docs/database.md` |
| Estructura o capas | `docs/architecture.md` |
| Cualquier cambio incorporado | Nueva entrada en `docs/change-log.md` |

Formato del change-log: fecha, módulo, tipo, descripción, archivos afectados.

## Versiones y tags

- Usa `git tag -a vX.Y.Z -m "..."` para versionar entregas.
- Actualiza `docs/change-log.md` antes de crear un tag.

## Archivos que NO debes modificar ni incluir en commits

- `app/js/config.js` (claves locales; está en `.gitignore`).
- No inventes claves ni subas secretos al repositorio.

## Cómo ahorrar tokens en este proyecto

- Lee **un** documento fuente por tema; no copies contenido entre archivos.
- Abre solo los archivos del módulo o tarea actual.
- Usa este `AGENTS.md` como mapa; profundiza en los enlaces solo si hace falta.
