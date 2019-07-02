const tb = require("../db/tb"); 
const users = tb.users;
const uRelation = tb.relation;
module.exports = {
    async addUser (uname) {
        return await users.create({
            name: uname
        })
    },
    async userList () {
        return await users.findAll()
    },
    async addRelationDb (uname1, uname2) {
        const uid1 = await users.find({
            where: {
                name: uname1
            }
        }).then((data) => {
            console.log(data);
        })
        
        const uid2 = await users.find({
            where: {
                name: uname2
            }
        }).then((data) => {
            console.log(data)
        })
        return await users.findAll()
        
        // return await uRelation.create({

        // })


    }
}