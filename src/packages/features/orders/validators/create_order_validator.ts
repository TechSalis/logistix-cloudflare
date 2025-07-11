import { OrderType } from '@core/db/types';
import { ValidatorResponse } from '@core/utils/types';

export default async function validateCreateOrderParams(json: Record<string, unknown>): Promise<ValidatorResponse> {
  const order_type: OrderType = json.order_type as OrderType;
  if (order_type === 'food') {
    return (await import('./create_order/food_order_validator')).default(json);
  } else if (order_type === 'delivery') {
    return (await import('./create_order/delivery_order_validator')).default(json);
  } else {
    return { valid: false, error: `Invalid type of order: ${order_type}. Must be one of ${'delivery'} | ${'food'} | ${'errands'} | ${'grocery'}` };
  }
}