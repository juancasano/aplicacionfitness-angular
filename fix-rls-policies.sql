-- SCRIPT PARA RECREAR POLÍTICAS RLS CORRECTAMENTE

-- Primero, DESHABILITAR RLS temporalmente para limpiar
ALTER TABLE categorias DISABLE ROW LEVEL SECURITY;
ALTER TABLE ejercicios DISABLE ROW LEVEL SECURITY;
ALTER TABLE rutinas DISABLE ROW LEVEL SECURITY;

-- Eliminar todas las políticas existentes
DROP POLICY IF EXISTS "categorias_select_public" ON categorias;
DROP POLICY IF EXISTS "ejercicios_select_public" ON ejercicios;
DROP POLICY IF EXISTS "rutinas_select_public" ON rutinas;
DROP POLICY IF EXISTS "rutinas_insert_public" ON rutinas;
DROP POLICY IF EXISTS "rutinas_update_public" ON rutinas;
DROP POLICY IF EXISTS "rutinas_delete_public" ON rutinas;
DROP POLICY IF EXISTS "categorias_select_all" ON categorias;
DROP POLICY IF EXISTS "ejercicios_select_all" ON ejercicios;
DROP POLICY IF EXISTS "rutinas_select_all" ON rutinas;
DROP POLICY IF EXISTS "rutinas_insert_all" ON rutinas;
DROP POLICY IF EXISTS "rutinas_update_all" ON rutinas;
DROP POLICY IF EXISTS "rutinas_delete_all" ON rutinas;

-- VOLVER A HABILITAR RLS
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE ejercicios ENABLE ROW LEVEL SECURITY;
ALTER TABLE rutinas ENABLE ROW LEVEL SECURITY;

-- CREAR NUEVAS POLÍTICAS - PERMITIR TODO PÚBLICAMENTE
-- CATEGORIAS
CREATE POLICY "categorias_public_select" ON categorias
  FOR SELECT USING (true);

-- EJERCICIOS
CREATE POLICY "ejercicios_public_select" ON ejercicios
  FOR SELECT USING (true);

-- RUTINAS - CRUD COMPLETO
CREATE POLICY "rutinas_public_select" ON rutinas
  FOR SELECT USING (true);

CREATE POLICY "rutinas_public_insert" ON rutinas
  FOR INSERT WITH CHECK (true);

CREATE POLICY "rutinas_public_update" ON rutinas
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "rutinas_public_delete" ON rutinas
  FOR DELETE USING (true);

-- Verificar que las políticas fueron creadas
SELECT tablename, policyname, cmd, qual, with_check FROM pg_policies 
WHERE tablename IN ('categorias', 'ejercicios', 'rutinas')
ORDER BY tablename;
