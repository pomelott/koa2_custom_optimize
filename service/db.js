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

module.exports = sequelize;