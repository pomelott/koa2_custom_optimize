const Sequelize = require('sequelize');
const sequelize = require('../conf/db_conf');
module.exports = {
    category: sequelize.define('category', {
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
    }),
    relation: sequelize.define('u_relation'),
    users: sequelize.define('users')
}