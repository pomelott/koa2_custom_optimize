const koa = require('koa');
const app = new koa();
const fs = require('fs');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const router = new Router();

router.get('/', (ctx, next) => {
    ctx.response.set({
        'Content-Type': 'text-html',
        'status': '200'
    })
    ctx.response.body = fs.createReadStream('./index.html');
})

router.get('/doget', (ctx, next) => {
    console.log(ctx.request.query)
    ctx.response.body = 'get render'
})
router.post('/dopost', (ctx, next) => {
    console.log('--------------------------------')
    console.log(ctx.request.body)
    ctx.response.body = 'post render'
})

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
app.listen(3000, () => {
    console.log('server is running at port 3000')
})

// app.use((ctx, next)=> {
//     // console.log(ctx);
//     if (ctx.request.url === '/') {
//         ctx.response.set({
//             'Content-Type': 'text-html',
//             'status': '200'
//         })
//         ctx.response.body = fs.createReadStream('./index.html');
//     }
//     if (ctx.request.method === 'POST') {
//         console.log('--------------------------------')
//         console.log(ctx.request.body)
//     }
// })

// app.listen(3000, () => {
//     console.log('server is running at port: 3000')
// })