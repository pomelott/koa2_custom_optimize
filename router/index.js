const Router = require('koa-router');
const { sign } = require('jsonwebtoken');
const secret = 'pomelo';
const jwt = require('koa-jwt')({secret});
const router = new Router();
const Login = require('./login');
const User = require('./user');


module.exports = (app) => {
    const ctr = app.controller;
    router.get('/', ctr.index.index)
    router.get('/404',ctr.index.notFound)
    router.get('/test',ctr.index.test);
    router.get('/doupload',ctr.upload.uploadIndex)
    // router.post('/sendfile',ctr.upload.sendFile)
    router.get('/datalist',ctr.datalist.linkDb)
    router.post('/sublist',ctr.datalist.subList)
    router.get('/testssr', ctr.ssr.testssr)
    router.post('/myadd', ctr.user.addUser)
    router.get('/userlist', ctr.user.userlist)
    router.post('/addrelation', ctr.user.addRelationHandler)
    router.post('/deluser', ctr.user.delUser)
    Login(router, sign, secret);
    User(router, jwt);
    
    

    app.use(router.routes()).use(router.allowedMethods())
}
