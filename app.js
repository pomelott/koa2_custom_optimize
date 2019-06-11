const koa = require('koa');
const app = new koa();



app.use(async (ctx, next) => {
    await next();
    console.log('logger')
})

app.use(async (ctx, next) => {
    console.log('response');
    await next();
})
app.use((ctx, next) => {
    setTimeout(() => {
        console.log('ok')
    }, 1000)
})

app.listen(3000, () => {
    console.log(`server is running at http://localhost:3000`)
})





