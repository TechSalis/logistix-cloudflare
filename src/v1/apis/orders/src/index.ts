import { urlPathPattern as getOrderPattern } from './endpoints/get_order';
import { urlPathPattern as getAllOrdersPattern } from './endpoints/get_orders';
import { urlPathPattern as ordersPattern } from './endpoints/create';
import { LazyRouter } from '../../../../packages/core/lib/lazy_router';
import { notFound } from '../../../../packages/core/utils/http';

const router = new LazyRouter('/v1/orders');

/// Consider sorting Alphabetically and utilizing a better-than-linear search algorithm

{ // Orders-Group
  router.on('POST', ordersPattern, async (req, params) => {
    const createOrder = await import('./endpoints/create');
    return createOrder.default.request(req, params);
  });

  router.on('GET', getOrderPattern, async (req, params) => {
    const getOrder = await import('./endpoints/get_order');
    return getOrder.default.request(req, params);
  });

  router.on('GET', getAllOrdersPattern, async (req, params) => {
    const getOrders = await import('./endpoints/get_orders');
    return getOrders.default.request(req, params);
  });
} // END Orders-Group

export default {
  async fetch(req: Request): Promise<Response> {
    return await router.route(req) || notFound();
  },
};
