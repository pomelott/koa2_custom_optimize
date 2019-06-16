const Router = require('koa-router');
const { sign } = require('jsonwebtoken');
const secret = 'pomelo';
const jwt = require('koa-jwt')({secret});
const router = new Router();
const IndexController = require('../controller/index');
const UploadController = require('../controller/upload');
const DataList = require('../controller/datalist');
const Login = require('./login');
const User = require('./user');


module.exports = (app) => {
    router.get('/', IndexController.index)
    router.get('/404', IndexController.notFound)
    router.get('/test', IndexController.test);
    router.get('/doupload', UploadController.uploadIndex)
    router.post('/sendfile', UploadController.sendFile)
    router.get('/datalist', DataList.linkDb)
    router.post('/sublist', DataList.subList)
    Login(router, sign, secret);
    User(router, jwt);
    
    

    app.use(router.routes()).use(router.allowedMethods())
}
