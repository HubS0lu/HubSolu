import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testUpdate() {
  const { data: stores, error: fetchError } = await supabase.from('stores').select('*').limit(1);
  if (fetchError) {
    console.error('Fetch error:', fetchError);
    return;
  }
  if (!stores || stores.length === 0) {
    console.log('No stores found to test.');
    return;
  }

  const store = stores[0];
  console.log('Store found:', store);

  // Try to update with the same object + some dummy data
  const { data, error } = await supabase.from('stores').update({
    ...store,
    name: store.name + ' test',
    whatsapp: store.whatsapp || '123',
    instagram: store.instagram || 'test'
  }).eq('id', store.id);

  if (error) {
    console.error('Update error:', error);
  } else {
    console.log('Update success');
  }
}

testUpdate();
