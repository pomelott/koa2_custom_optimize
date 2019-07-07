const DirProxy = require('./DirProxy');

module.exports = (app) => {
    app.controller = new DirProxy().init()

}