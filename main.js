const koa = require('koa');
const app = new koa();
const fs = require('fs');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const router = new Router();
const views = require('koa-views');
const static = require('koa-static');
const path = require('path');
const render = require('koa-ejs');
app.use(views(__dirname + '/views', {
    map: {html: 'ejs'}
}))
// render(app, {
//     root: path.join(__dirname, 'views'),
//     layout: 'template',
//     viewExt: 'html',
//     cache: false,
//     debug: true

// })
app.use(static(path.join(__dirname, '/static')))

router.get('/', async (ctx, next) => {
    console.log(1)
    console.log('----: ' + __dirname)
    await ctx.render('list')
})

router.get('/404', async (ctx, next) => {
    await ctx.render('404')
})


router.get('/doget', (ctx, next) => {
    console.log(2)
    console.log(ctx.request.query)
    ctx.response.body = 'get render'
})

router.post('/dopost', (ctx, next) => {
    console.log(3)
    console.log('--------------------------------')
    console.log(ctx.request.body)
    ctx.response.body = 'post render'
})

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
app.listen(3000, () => {
    console.log('server is running at port 3000');
    console.log(3)
})

