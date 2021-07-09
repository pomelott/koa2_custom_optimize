import { Context, Next } from 'koa';
export default function defaultPageMiddleware (routePool: Array<string>) {
	return async (ctx: Context, next: Next) => {
		if (ctx.request.url) {
			if (ctx.request.url === '/') {
				await ctx.render('index.html');
				next();
			} else if (routePool.indexOf(ctx.request.url) === -1) {
				await ctx.render('/error/404.pug', {name: 'tate'});
				next();
			} else {
				next();
			}
		}

	}
}