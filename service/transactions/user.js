const userModel = require('../model/user');
const sequelize = require('../conf/db_conf');
module.exports = {
    async delUserTrans (uname) {
        return sequelize.transaction((t) => {
            return userModel.delRelation({uname}, {transaction: t}).then(() => {
                return userModel.delUser({uname}, {transaction: t})
            })
        }).then((msg) => {
            console.log('done')
            console.log(msg)
        }).catch((err) => {
            console.log(err)
        })
    }
}