import { ErrorResponse } from '../utils/error_responses';
import { LazyRouter } from '../utils/lazy_router';
import { urlPathPattern as signupWithPasswordPattern } from './features/auth/api/sign_up_email';
import { urlPathPattern as loginWithPasswordPattern } from './features/auth/api/log_in_email';
import { urlPathPattern as GetOrderPattern } from './features/orders/api/get_order';
import { urlPathPattern as GetOrdersPattern } from './features/orders/api/get_orders';
import { urlPathPattern as CreateOrderPattern } from './features/orders/api/create_order';

const router = new LazyRouter('/v1');

{ /// Auth-Group
  router.on('POST', signupWithPasswordPattern, async (req) => {
    const signUp = await import('./features/auth/api/sign_up_email');
    return signUp.execute(req);
  });
  router.on('POST', loginWithPasswordPattern, async (req) => {
    const login = await import('./features/auth/api/log_in_email');
    return login.execute(req);
  });
} /// END Auth-Group

{ /// Orders-Group
  router.on('GET', GetOrderPattern, async (req, match) => {
    const getOrder = await import('./features/orders/api/get_order');
    return getOrder.default.request(req, match);
  });

  router.on('GET', GetOrdersPattern, async (req, match) => {
    const getOrders = await import('./features/orders/api/get_orders');
    return getOrders.default.request(req, match);
  });

  router.on('POST', CreateOrderPattern, async (req, match) => {
    const createOrder = await import('./features/orders/api/create_order');
    return createOrder.default.request(req, match);
  });
} /// END Orders-Group


export default {
  async route(req: Request): Promise<Response> {
    return await router.route(req) || ErrorResponse.notFound();
  },
};
