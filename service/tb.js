const Sequelize = require('sequelize');
const sequelize = require('./db');
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
    })
}