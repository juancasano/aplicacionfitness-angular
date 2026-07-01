-- Ver todas las políticas de la tabla rutinas
SELECT * FROM auth.bypass_rls();
SELECT schema_name, tablename, policyname FROM pg_policies WHERE tablename = 'rutinas';

-- O directamente en SQL:
-- SELECT schema_name, table_name, policy_name, qual, with_check 
-- FROM information_schema.role_routine_grants 
-- WHERE table_name = 'rutinas';

-- Verificar que RLS esté habilitado
SELECT * FROM information_schema.tables 
WHERE table_name = 'rutinas' AND row_security_level IS NOT NULL;
