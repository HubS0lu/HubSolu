import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Inicializa o cliente do Supabase
// Adicionamos um fallback temporário caso as chaves não estejam configuradas para evitar erros fatais na build
export const supabase = createClient(
  supabaseUrl || 'https://url-temporaria-coloque-a-sua-no-env.supabase.co',
  supabaseAnonKey || 'chave-temporaria-coloque-a-sua-no-env'
);
