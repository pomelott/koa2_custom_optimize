const tb = require("../db/tb"); 
const Sequelize = require('sequelize');
const users = tb.users;
const uRelation = tb.relation;
const category = tb.category;
const Op = Sequelize.Op
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
    async delUser (param, conf) {
        return await users.destroy({
            where: {
                name: param.uname
            },
            force: true
        }).then(data => console.log(data)).catch(err => console.log(err))
    },
    async delRelation (param, conf) {
        let uid;
        await users.findOne({
            where: {
                name: param.uname
            }
        }).then(async (data) => {
            uid = data.dataValues.uid;
            return await uRelation.destroy({
                where: {
                    [Op.or]: [
                        {join_id1: uid},
                        {join_id2: uid}
                    ]
                }
            })
        })
    },
}