// Folder: cloudflare/services/order.service.ts

import { supabaseRequest } from '../../../../db/supabase_client';

interface CreateOrderParams {
  user_id: string;
  pickup: Record<string, unknown>;
  dropoff: Record<string, unknown>;
  description: string;
  extras: Record<string, unknown>;
  order_type: string;
}

export async function createOrder(
  { user_id, pickup, dropoff, description, extras, order_type }: CreateOrderParams,
) {
  return await supabaseRequest(
    'Orders',
    'POST',
    {
      user_id,
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
  userId: string, limit: number = 10
) {
  return await supabaseRequest(
    `Orders?select=*&user_id=eq.${userId}&order=created_at.desc&limit=${limit}`,
    'GET',
  );
}

export async function getOrder(userId: string, id: string) {
  return await supabaseRequest(`Orders?select=*&order_id=eq.${id}`, 'GET');
}
