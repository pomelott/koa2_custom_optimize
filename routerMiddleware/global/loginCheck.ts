import { Context } from "vm";
import { Next } from "koa";

export default async (ctx: Context, next: Next) => {
    console.log('[global-routerMiddleware]: check login !');
    await next();
}