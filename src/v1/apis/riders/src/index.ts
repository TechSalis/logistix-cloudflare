import { LazyRouter } from '../../../../packages/core/lib/lazy_router';
import { notFound } from '../../../../packages/core/utils/http';
import { urlPathPattern as findNearestRiderPattern } from './endpoints/find_nearest_rider';

const router = new LazyRouter('/v1/riders');

/// Consider sorting Alphabetically and utilizing a better-than-linear search algorithm

router.on('POST', findNearestRiderPattern, async (req, params) => {
    const createOrder = await import('./endpoints/find_nearest_rider');
    return createOrder.default.request(req, params);
});

export default {
    async fetch(req: Request): Promise<Response> {
        return await router.route(req) || notFound();
    },
};
