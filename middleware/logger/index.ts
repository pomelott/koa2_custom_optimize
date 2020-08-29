import { Context } from "vm";
import { Next } from "koa";

export default async (ctx: Context, next: Next) => {
    console.log('[middleware]: logger middleware');
    await next();
}