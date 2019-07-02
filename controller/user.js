
module.exports = {
    userInfo: async (ctx, next) => {
        ctx.body = {username: ctx.state.user.username}
        console.log(ctx)
    },
    vipList: async (ctx, next) => {
        console.log(ctx.state)
        
    },
    addUser: async (ctx, next) => {
        console.log(111);
        let str = ctx.request.body
        console.log(str)
        // await ctx.model.user.addUser('pomelott');
        // ctx.send({test: 'fdsfds'})
    },
    userlist: async (ctx, next) => {
        let mylistData = [];
        await ctx.model.user.userList().then((tb) => {
            for (let index in tb) {
                mylistData.push(tb[index])
            }
        })
        console.log(mylistData)
        await ctx.render('userlist', {listData: mylistData})
    },
    addRelationHandler: async (ctx, next) => {
        console.log(111)
        await ctx.model.user.addRelationDb('pomelott', 'tate').then((tb) => {
            console.log(tb)
        }).catch((err) => {
            console.log(err)
        })
        await ctx.send({status: 0})
    }
}