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
    relation: sequelize.define('u_relation', {
        r_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        join_id1: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        join_id2: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        ext: {
            type: Sequelize.TEXT,
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    }),
    users: sequelize.define('users', {
        uid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        name: {
            type: Sequelize.CHAR,
            allowNull: false
        },
        age: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    })
}