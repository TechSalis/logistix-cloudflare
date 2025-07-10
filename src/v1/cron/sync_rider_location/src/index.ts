import { getSupabaseClient } from '../../../../packages/core/db/supabase_client';

export default {
	async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
		const supabase = getSupabaseClient(env);

		const riderKeys = await env.RIDER_KV.list({prefix: 'rider:locations:*'});
		for (const key of riderKeys.keys) {
			const value = await env.RIDER_KV.get(key.name);
			if (value) {
				const { lat, lng } = JSON.parse(value);
				await supabase
					.from('Riders')
					.update({ location: `SRID=4326;POINT(${lng} ${lat})` })
					.eq('user_id', key.name.split(':')[2]);
			}
		}
		return new Response(JSON.stringify({ updated: riderKeys.keys.length }));
	}
}