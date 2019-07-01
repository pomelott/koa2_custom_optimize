const users = require("../db/tb").users;

module.exports = {
    async addUser (uname) {
        return await users.create({
            name: uname
        })
    }
}