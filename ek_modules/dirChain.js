const DirProxy = require('./DirProxy');
const path = require('path');
module.exports = (app) => {
    app.controller = new DirProxy('controller').init();
}