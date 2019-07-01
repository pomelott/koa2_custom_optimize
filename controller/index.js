module.exports = {
    test: async (ctx, next) => {
        ctx.send({
            vip: true,
            test: 'ok'
        })
    },
    index: async (ctx, next) => {
        await ctx.render('user', {
            author: 'pomelott'
        })
    },
    notFound: async (ctx, next) => {
        await ctx.render('404')
    }
}