// Folder: cloudflare/validators/order.validator.ts

import { ValidatorResponse } from "../validator_response";

interface DeliveryOrderInput {
  pickup?: string;
  dropoff?: string;
  description?: string;
  images?: string[];
}

export function validateOrderInput(data: DeliveryOrderInput): ValidatorResponse {
  if (!data.pickup || data.pickup.trim().length === 0) {
    return { valid: false, error: 'Pickup is required' };
  }
  if (!data.dropoff || data.dropoff.trim().length === 0) {
    return { valid: false, error: 'Dropoff is required' };
  }
  if (!data.description || data.description.trim().length === 0) {
    return { valid: false, error: 'Description is required' };
  }
  if (data.description.length > 255) {
    return { valid: false, error: 'Description is too long' };
  }
  if (data.images && data.images.length > 4) {
    return { valid: false, error: 'A maximum of 4 images is allowed' };
  }
  return { valid: true };
}