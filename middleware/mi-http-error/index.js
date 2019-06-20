
module.exports = (nunjucks, path) => {
    return async (ctx, next) => {
        try {
            await next();
            if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404)
        } catch (err) {
            await ctx.render('error/404');
        }
    }
}