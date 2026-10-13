// Credenciales de Supabase (anon key pública del proyecto).
// Si dejas los placeholders, DatosFitnessService usa datos mock locales.
export const SUPABASE_URL = 'https://tu-proyecto.supabase.co';
export const SUPABASE_ANON_KEY = 'tu-clave-publica-aqui';

export function isSupabaseConfigured(): boolean {
  const url = SUPABASE_URL.trim();
  const key = SUPABASE_ANON_KEY.trim();
  return (
    !!url &&
    !!key &&
    !url.includes('tu-proyecto.supabase.co') &&
    key !== 'tu-clave-publica-aqui'
  );
}
