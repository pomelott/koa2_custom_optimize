const koa = require('koa');
const Router = require('koa-router');
const app = new koa();
const router = new Router();
const MiddleWare = require('./middleware');

// 中间件初始化
MiddleWare(app);
app.use(router.routes());

router.get('/', async (ctx, next) => {
    await ctx.render('user', {
        author: 'pomelott'
    })
    await next()
})


router.get('/test', (ctx, next) => {
    ctx.response.body = 'get------/test';
})

router.delete('/myadd', (ctx, next) => {
    console.log(1212112121)
})



app.listen(8899, () => {
    console.log('listen ing , port: 8888')
})