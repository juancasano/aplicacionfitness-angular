# Fuente única de verdad

## Objetivo

Evitar la duplicación de información en la documentación del proyecto.

## Reglas

Cada tipo de información debe tener un único archivo de referencia:

| Tipo de información | Archivo |
|---|---|
| Reglas globales | `spec.md` |
| Tablas, campos y relaciones | `docs/database.md` |
| Arquitectura técnica | `docs/architecture.md` |
| Funcionalidad de cada módulo | `docs/modules/<modulo>/<modulo>Spec.md` |
| Implementación de cada módulo | `docs/modules/<modulo>/<modulo>Implementation.md` |
| Historial de cambios | `docs/change-log.md` |

## Buenas prácticas

- No repitas la estructura de tablas en `*Spec.md` de módulo si ya está documentada en `docs/database.md`.
- No repitas conceptos de arquitectura en los documentos de módulo si ya están en `docs/architecture.md`.
- Usa enlaces para referenciar la fuente correcta cuando necesites más detalles.

## Antes de escribir

- ¿Esta información ya está documentada en otro archivo?
- ¿Pertenece realmente al documento actual?
- ¿Debería enlazar en lugar de repetir?

## Por qué es importante

Mantener una fuente única de verdad hace la documentación más fácil de mantener y evita discrepancias entre documentos.
