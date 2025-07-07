import { ValidatorResponse } from "../../../../../db/constants/validator_response";

interface DeliveryOrderInput {
  pickup?: unknown;
  dropoff?: unknown;
  description?: unknown;
  images?: unknown;
}

export default function validateOrderInput(data: DeliveryOrderInput): ValidatorResponse {
  let errorMessage = '';

  if (!data.pickup || typeof data.pickup !== 'string' || data.pickup.trim().length === 0) {
    errorMessage += 'Pickup location is required.';
  }
  if (!data.dropoff || typeof data.dropoff !== 'string' || data.dropoff.trim().length === 0) {
    errorMessage += ' Dropoff location is required.';
  }
  if (!data.description || typeof data.description !== 'string' || data.description.trim().length === 0) {
    errorMessage += ' A description is required.';
  }
  else if (data.description.length > 255) {
    errorMessage += ' This description is too long.';
  }
  if (data.images) {
    if (!Array.isArray(data.images)) {
      errorMessage += ' Images must be set properly.';
    }
    if (Array(data.images).length > 4) {
      errorMessage += ' A maximum of 4 images is allowed.';
    }
  }

  if (errorMessage.length > 0) return { valid: false, error: errorMessage };
  return { valid: true };
}