module.exports = {
    userInfo: async (ctx, next) => {
        ctx.body = {username: ctx.state.user.username}
        console.log(ctx)
    },
    vipList: async (ctx, next) => {
        console.log(ctx.state)
        
    },
    addUser: async (ctx, next) => {
        console.log(111111111111111111111)
        console.log(ctx.request)
        // ctx.model.user.addUser(ctx.)
        // ctx.response.body ='dfs'
        ctx.send({test: 'fdsfds'})
    }
}