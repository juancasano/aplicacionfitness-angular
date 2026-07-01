-- Renombra las tablas existentes de coches/marcas/modelos a nombres enfocados en fitness.
-- Ejecuta este script en Supabase si ya tienes estas tablas en el esquema público.

ALTER TABLE public.marcas RENAME TO categorias;
ALTER TABLE public.modelos RENAME TO ejercicios;
ALTER TABLE public.coches RENAME TO rutinas;
