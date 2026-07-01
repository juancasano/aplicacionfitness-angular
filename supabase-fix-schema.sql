-- ============================================
-- SCRIPT PARA RESTRUCTURAR TABLAS FITNESS
-- ============================================
-- Ejecutar en SQL Editor de Supabase

-- 1. TABLA CATEGORIAS (solo renombrar nombre si es necesario)
-- Suponiendo que ya tiene estructura correcta (id, nombre)
-- Si no, ejecutar:
-- ALTER TABLE categorias RENAME COLUMN "marcas_antigua" TO nombre;

-- 2. TABLA EJERCICIOS - Renombrar columna idmarca → idCategoria
ALTER TABLE ejercicios RENAME COLUMN "idmarca" TO "idCategoria";

-- 3. TABLA RUTINAS - Necesita restructuración completa
-- Primero, borrar la tabla y recrearla
DROP TABLE IF EXISTS rutinas CASCADE;

CREATE TABLE rutinas (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  duracion VARCHAR NOT NULL,
  completada BOOLEAN NOT NULL DEFAULT FALSE,
  favorita BOOLEAN NOT NULL DEFAULT FALSE,
  diaria BOOLEAN NOT NULL DEFAULT FALSE,
  "idCategoria" BIGINT NOT NULL REFERENCES categorias(id),
  "idEjercicio" BIGINT NOT NULL REFERENCES ejercicios(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. INSERTAR DATOS EN categorias (si está vacía)
INSERT INTO categorias (id, nombre) VALUES
(1, 'Fuerza'),
(2, 'Cardio'),
(3, 'Flexibilidad'),
(4, 'Yoga')
ON CONFLICT (id) DO NOTHING;

-- 5. INSERTAR DATOS EN ejercicios (si está vacía)
INSERT INTO ejercicios (id, nombre, "idCategoria") VALUES
(1, 'Sentadilla con salto', 1),
(2, 'Press de banca', 1),
(3, 'Carrera continua', 2),
(4, 'Burpees', 2),
(5, 'Estiramientos', 3),
(6, 'Postura del árbol', 4)
ON CONFLICT (id) DO NOTHING;

-- 6. INSERTAR DATOS EN rutinas (ejemplo - adaptarlos según tu CSV)
INSERT INTO rutinas (duracion, completada, "idCategoria", "idEjercicio") VALUES
('30 min', FALSE, 1, 1),
('45 min', FALSE, 2, 3),
('20 min', TRUE, 3, 5),
('25 min', FALSE, 4, 6)
ON CONFLICT (id) DO NOTHING;

-- 7. HABILITAR RLS
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE ejercicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE rutinas ENABLE ROW LEVEL SECURITY;

-- 8. POLÍTICAS RLS - Permitir acceso público (sin auth)
-- CATEGORIAS - Solo lectura
CREATE POLICY "categorias_select_public" ON categorias FOR SELECT USING (true);

-- EJERCICIOS - Solo lectura
CREATE POLICY "ejercicios_select_public" ON ejercicios FOR SELECT USING (true);

-- RUTINAS - CRUD completo
CREATE POLICY "rutinas_select_public" ON rutinas FOR SELECT USING (true);
CREATE POLICY "rutinas_insert_public" ON rutinas FOR INSERT WITH CHECK (true);
CREATE POLICY "rutinas_update_public" ON rutinas FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "rutinas_delete_public" ON rutinas FOR DELETE USING (true);
