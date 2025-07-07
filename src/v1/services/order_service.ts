// Folder: cloudflare/services/order.service.ts

import { supabaseRequest } from '../db/supabase_client';

interface CreateOrderParams {
  userId: string;
  pickup: Record<string, unknown>;
  dropoff: Record<string, unknown>;
  description: string;
  extras: Record<string, unknown>;
  order_type: string;
}

export async function createOrder(
  { userId, pickup, dropoff, description, extras, order_type }: CreateOrderParams,
  env: Env
) {
  return await supabaseRequest(
    'orders',
    'POST',
    env,
    {
      user_id: userId,
      pickup,
      dropoff,
      description,
      extras,
      order_type,
      // status: 'pending'
    }
  );
}

export async function getOrders(
  userId: string, env: Env, status?: string, limit: number = 10
) {
  return await supabaseRequest(
    `orders?select=*&user_id=eq.${userId}${status ? `&status=${status}` : ''}&order=created_at.desc&limit=${limit}`,
    'GET',
    env
  );
}
