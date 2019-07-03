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
        return await users.findAll();
    },
    async addRelationDb (uname1, uname2) {
        
        let uid1, uid2;
        const pUid1 = await users.findOne({
            where: {
                name: uname1
            }
        }).then((data) => {
            uid1 = data.dataValues.uid;
        })
        
        const pUid2 = await users.findOne({
            where: {
                name: uname2
            }
        }).then((data) => {
            uid2 = data.dataValues.uid;
        })

        Promise.all([pUid1, pUid2]).then(async () => {
            return await uRelation.create({
                join_id1: uid1,
                join_id2: uid2
            })
        })
    },
    async delUser (uname) {
        console.log(uname)
        return await users.delete({
            where: {
                name: {
                    eq: uname
                }
            },
            force: true,
            truncate: true
        }).then(data => console.log(data)).catch(err => console.log(err))
    }
}