import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function testUpdate() {
  console.log('Fetching stores...');
  const { data: stores } = await supabase.from('stores').select('*').limit(1);
  const store = stores[0];

  console.log('Attempting to update store ID:', store.id);
  const { data, error } = await supabase.from('stores').update({ description: 'Test Update' }).eq('id', store.id).select();
  
  console.log('Error:', error);
  console.log('Data returned from update:', data);
}

testUpdate();
