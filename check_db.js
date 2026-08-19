import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDb() {
  console.log('Fetching stores...');
  const { data: stores, error: storesError } = await supabase.from('stores').select('*');
  if (storesError) {
    console.error('Error fetching stores:', storesError);
  } else {
    console.log(`Found ${stores?.length || 0} stores:`);
    stores?.forEach(s => console.log(s));
  }
}

checkDb();
