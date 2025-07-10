import { supabaseRequest } from '@cloudflare/core/db/supabase_client';
import type { CreateOrder } from '../types';
import { Env } from '@cloudflare/core/db/types';


export async function createOrder(
  user_id: string,
  token: string,
  { pickup, dropoff, description, extras, order_type }: CreateOrder,
  env: Env,
) {
  return await supabaseRequest(
    'Orders',
    'POST',
    token,
    env,
    {
      user_id,
      pickup,
      dropoff,
      description,
      extras,
      order_type,
    } as CreateOrder,
  );
}

export async function getOrders(
  token: string, userId: string, limit: number = 10, page: number = 0,
  env: Env
) {
  return await supabaseRequest(
    `Orders?select=ref_number,pickup,dropoff,description,order_type`
    + `&user_id=eq.${userId}&order=created_at.desc&limit=${limit}&offset=${limit * page}`,
    'GET',
    token,
    env,
  );
}

export async function getOrder(token: string, orderId: string,
  env: Env,

) {
  return await supabaseRequest(
    `Orders?select=*&order_id=eq.${orderId}`, 'GET', token,
    env,
  );
}
