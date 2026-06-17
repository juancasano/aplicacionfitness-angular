# Módulo: Entrenamientos (Workouts) - Especificación funcional

## Objetivo

Gestionar entrenamientos que agrupan ejercicios. Permite crear, editar, listar y eliminar workouts.

## Funcionalidades

- Listar workouts del usuario.
- Crear un workout con nombre, duración y selección de ejercicios.
- Editar workout y su lista de ejercicios.
- Eliminar workout.

## Reglas funcionales

- Un workout debe tener al menos un ejercicio.
- La duración es obligatoria y en minutos.
- Los ejercicios se seleccionan desde un multiselect o lista con checkboxes.

## Criterios de aceptación

- La página `workouts.html` muestra formulario y lista.
- El formulario permite añadir/quitar ejercicios asociados.
- Tras crear/editar/eliminar, la lista se actualiza.

Referencias:

- Datos: [docs/database.md](../../database.md)
- Arquitectura: [docs/architecture.md](../../architecture.md)
