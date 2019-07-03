let querytoObj = require('../ek_modules/queryToObj')
module.exports = {
    userInfo: async (ctx, next) => {
        ctx.body = {username: ctx.state.user.username}
    },
    vipList: async (ctx, next) => {
        console.log(ctx.state)
        
    },
    addUser: async (ctx, next) => {

    let queryObj = querytoObj(ctx.request.body);
    await ctx.model.user.addUser(queryObj.uname).then((data) => {
        console.log(data)
    })


    },
    userlist: async (ctx, next) => {
        let mylistData = [];
        await ctx.model.user.userList().then((tb) => {
            for (let index in tb) {
                mylistData.push(tb[index])
            }
        })
        await ctx.render('userlist', {listData: mylistData})
    },
    addRelationHandler: async (ctx, next) => {
        let param  = querytoObj(ctx.request.body);
        await ctx.model.user.addRelationDb(param.uname1, param.uname2).then((tb) => {
            ctx.send({status: 0})
        }).catch((err) => {
            console.log(err)
        })
    },
    delUser: async (ctx, next) => {
        let param = querytoObj(ctx.request.body);
        await ctx.model.user.delUser(param.uname).then((data) => {
         
            ctx.send({status: 0})
        })
    }
}