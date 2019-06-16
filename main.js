const koa = require('koa');
const app = new koa();
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const router = new Router();
const views = require('koa-views');
const static = require('koa-static');
const path = require('path');

const { sign } = require('jsonwebtoken');
const secret = 'demo';
const jwt = require('koa-jwt')({secret});

app.use(bodyParser())
app.use(views(__dirname + '/views', {
    map: {html: 'ejs'}
}))

app.use(static(path.join(__dirname, '/static')))

app.use(async (ctx, next) => {
    console.log(ctx)
    let params =Object.assign({}, ctx.request.query, ctx.request.body);
    ctx.request.header = {'authorization': "Bearer " + (params.token || '')}
    await next();
})

router.get('/', async (ctx, next) => {
    await ctx.render('index')
})

router.post('/login', async (ctx, next) => {
    const user = ctx.request.body;
    if (user && user.username === 'tate') {
        let {username} = user;
        const token = sign({username, test: 'testok'}, secret, {expiresIn: '1h'});
        ctx.body = {
            mssage: 'GET TOKEN SUCCESS',
            code: 1,
            token
        }
    } else {
        ctx.body = {
            message: 'param error',
            code: -1
        }
    }
})
.get('/userinfo', jwt, async (ctx, next) => {
    ctx.body = {username: ctx.state.user.username}
    console.log(ctx)
})
.get('/viplist', jwt, async (ctx, next) => {
    console.log(ctx.state)
    ctx.body = 'check ok'
})

router.get('/404', async (ctx, next) => {
    await ctx.render('404')
})

// router.get('/user/:id', (ctx, next) => {
//     console.log('404')
// })
// router.post('user', '/user/:id', (ctx, next) => {
//     console.log('-------------------------------------------------------' + JSON.stringify(ctx.params))
//     let urlArr = ctx.request.url.split('/'),
//         id = urlArr[urlArr.length - 1];
//     // ctx.response.status= 302;
//     if (id === '16') {
//         ctx.redirect('/user/5')
//     } else {
//         ctx.response.body = 'lalala'
//     }
    
//     // ctx.response.body = 'fdsfds';
//     next();
// }, (ctx, next) => {
//     console.log('----------------------------next')
// })


// router.post('/passage/:id/posts', (ctx, next) => {
//     console.log(ctx)
//     ctx.response.body = 'passage'
// })



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

router.get('/:first/:sec', (ctx, next) => {
    console.log(ctx.params)
})

app
    .use(router.routes())
    .use(router.allowedMethods())
app.listen(3000, () => {
    console.log('server is running at port 3000');
    console.log(3)
})

