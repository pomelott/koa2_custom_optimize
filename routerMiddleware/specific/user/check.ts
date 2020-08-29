import { Context } from "vm";
import { Next } from "koa";

export default async (cxt: Context, next: Next) => {
    console.log('[router-middleware]: check')
    await next()
}