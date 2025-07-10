import { urlPathPattern as authSignupPattern } from './endpoints/sign_up_email';
import { urlPathPattern as authLoginPattern } from './endpoints/log_in_email';
import { urlPathPattern as authAnonymousLogin } from './endpoints/log_in_anonymous';
import { urlPathPattern as authAnonymousUpgrade } from './endpoints/upgrade_anonymous_user';
import { LazyRouter } from '@cloudflare/core/lib/lazy_router';
import { notFound } from '@cloudflare/core/utils/http';

const router = new LazyRouter('/v1/customer/auth');

{ // Auth-Group
  router.on('POST', authAnonymousLogin, async (req) => {
    const signUp = await import('./endpoints/log_in_anonymous');
    return signUp.execute(req);
  });
  router.on('POST', authAnonymousUpgrade, async (req) => {
    const signUp = await import('./endpoints/upgrade_anonymous_user');
    return signUp.execute(req);
  });
  router.on('POST', authLoginPattern, async (req) => {
    const login = await import('./endpoints/log_in_email');
    return login.execute(req);
  });
  router.on('POST', authSignupPattern, async (req) => {
    const signUp = await import('./endpoints/sign_up_email');
    return signUp.execute(req);
  });
} // END Auth-Group

export default {
  async fetch(req: Request): Promise<Response> {
    return await router.route(req) || notFound();
  },
};
