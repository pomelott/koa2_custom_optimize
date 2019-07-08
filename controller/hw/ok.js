module.exports = {
    ok: async (ctx, next) => {
        // console.log(ctx)
        await ctx.render('index')
    }
}