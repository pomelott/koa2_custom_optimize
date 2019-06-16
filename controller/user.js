module.exports = {
    userInfo: async (ctx, next) => {
        ctx.body = {username: ctx.state.user.username}
        console.log(ctx)
    },
    vipList: async (ctx, next) => {
        console.log(ctx.state)
        
    }
}