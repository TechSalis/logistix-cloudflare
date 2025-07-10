import { supabaseRequest } from '../../../../db/supabase_client';

export type CreateOrderParams = {
  pickup: Record<string, unknown>;
  dropoff: Record<string, unknown>;
  description: string;
  extras: Record<string, unknown>;
  order_type: string;
}

export async function createOrder(
  user_id: string,
  token: string,
  { pickup, dropoff, description, extras, order_type }: CreateOrderParams,
) {
  return await supabaseRequest(
    'Orders',
    'POST',
    token,
    {
      user_id,
      pickup,
      dropoff,
      description,
      extras,
      order_type,
    },
  );
}

export async function getOrders(
  token: string, userId: string,
  limit: number = 10, page: number = 0
) {
  return await supabaseRequest(
    `Orders?select=*&user_id=eq.${userId}&order=created_at.desc&limit=${limit}&offset=${limit * page}`,
    'GET',
    token,
  );
}

export async function getOrder(
  token: string, orderId: string) {
  return await supabaseRequest(
    `Orders?select=*&order_id=eq.${orderId}`, 'GET', token,
  );
}
