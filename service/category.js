const category = require('./tb').category

module.exports = {
    getList: async () => {
        return await category.findAll()
    },
    sync: () => {
        category.sync();
    },
    subList: async (uid, name) => {
        return await category.create({
            uid: uid,
            name: name
        })
    }
}