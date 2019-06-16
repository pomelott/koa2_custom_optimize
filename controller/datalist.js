const Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})
sequelize.authenticate().then(() => {
    console.log('okkkkk')
}).catch((err) => {
    console.log(err)
})
const mylist = sequelize.define('category', {
    uid: {
        type: Sequelize.UUID,
        unique: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
})
module.exports = {
    linkDb: async (ctx, next) => {
        
        
        mylist.sync();
        let mylistData = [];
        await mylist.findAll().then((tb) => {
            for (let index in tb) {
                mylistData.push(tb[index])
            }
        });
        await ctx.render('datalist', {listData: mylistData})
    },
    subList: async (ctx, next) => {
        console.log()
        let paramArr = ctx.request.body.split('\r\n');
        let temp = {};
        paramArr.forEach((item, index) => {
            if (item.length) {
                let tempSlice = item.split('=')
                temp[tempSlice[0]] = tempSlice[1]
            }
            
        })
        console.log(temp)
        await mylist.create({
            uid: temp.uid,
            name: temp.uname
        }).then(() => {
            ctx.send({status: 0})
        })
    }
}