module.exports = {
    linkDb: async (ctx, next) => {
        let mylistData = [];
        // opCategory.sync();
        await ctx.db.category.getList().then((tb) => {
            for (let index in tb) {
                mylistData.push(tb[index])
            }
        })
        await ctx.render('datalist', {listData: mylistData})
    },
    subList: async (ctx, next) => {
        let paramArr = ctx.request.body.split('\r\n');
        let temp = {};
        paramArr.forEach((item, index) => {
            if (item.length) {
                let tempSlice = item.split('=')
                temp[tempSlice[0]] = tempSlice[1]
            }
            
        })
        await ctx.db.category.subList(temp.uid, temp.uname).then(() => {
            ctx.send({status: 0})
        })
    }
}