import { OrderTypes } from '../../../../db/constants/db_constants';
import { ValidatorResponse } from '../../../../db/constants/validator_response';

export default async function validateOrderByType(json: Record<string, unknown>): Promise<ValidatorResponse> {
  const order_type = json.order_type as string;
  let validateOrderInput: ((input: Record<string, unknown>) => ValidatorResponse);
  
  if (order_type === OrderTypes.food) {
    validateOrderInput = (await import('./create_order/food_order_validator')).default;
  } else if (order_type === OrderTypes.delivery) {
    validateOrderInput = (await import('./create_order/delivery_order_validator')).default;
  } else {
    return { valid: false, error: `Invalid order_type: ${order_type}. Must be one of ${OrderTypes.values}` };
  }
  return validateOrderInput(json);
}