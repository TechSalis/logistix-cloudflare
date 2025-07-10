import { notFound } from './core/utils/error_responses';
import { LazyRouter } from './core/lib/lazy_router';
import { urlPathPattern as authSignupPattern } from './features/auth/api/sign_up_email';
import { urlPathPattern as authLoginPattern } from './features/auth/api/log_in_email';
import { urlPathPattern as getOrderPattern } from './features/orders/api/get_order';
import { urlPathPattern as getAllOrdersPattern } from './features/orders/api/get_orders';
import { urlPathPattern as ordersPattern } from './features/orders/api/create_order';
import { urlPathPattern as authAnonymousLogin } from './features/auth/api/log_in_anonymous';
import { urlPathPattern as authAnonymousUpgrade } from './features/auth/api/upgrade_anonymous_user';

const router = new LazyRouter('/v1');

/// Consider sorting Alphabetically and utilizing a better-than-linear search algorithm

{ // Auth-Group
  router.on('POST', authAnonymousLogin, async (req) => {
    const signUp = await import('./features/auth/api/log_in_anonymous');
    return signUp.execute(req);
  });
  router.on('POST', authAnonymousUpgrade, async (req) => {
    const signUp = await import('./features/auth/api/upgrade_anonymous_user');
    return signUp.execute(req);
  });
  router.on('POST', authLoginPattern, async (req) => {
    const login = await import('./features/auth/api/log_in_email');
    return login.execute(req);
  });
  router.on('POST', authSignupPattern, async (req) => {
    const signUp = await import('./features/auth/api/sign_up_email');
    return signUp.execute(req);
  });
} // END Auth-Group

{ // Orders-Group
  router.on('POST', ordersPattern, async (req, params) => {
    const createOrder = await import('./features/orders/api/create_order');
    return createOrder.default.request(req, params);
  });

  router.on('GET', getOrderPattern, async (req, params) => {
    const getOrder = await import('./features/orders/api/get_order');
    return getOrder.default.request(req, params);
  });

  router.on('GET', getAllOrdersPattern, async (req, params) => {
    const getOrders = await import('./features/orders/api/get_orders');
    return getOrders.default.request(req, params);
  });
} // END Orders-Group

export default {
  async fetch(req: Request): Promise<Response> {
    return await router.route(req) || notFound();
  },
};
