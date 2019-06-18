const koa = require('koa');
const app = new koa();
const MiddleWare = require('./middleware');
const Router = require('./router')
// const views = require('koa-views');


const log4js = require('log4js');

log4js.configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: 'cheese.log'
        }
    },
    categories: {
        default: {
            appenders: ['cheese'],
            level: 'trace'
        }
    }
})


const logger = log4js.getLogger('cheese');
logger.trace('entering cheese testing');
logger.debug('got cheese');
logger.info('cheese is Gouda');
logger.warn('cheese is quite smelly');
logger.error('cheese is too ripe');
logger.fatal('cheese was breeding ground for listeria');


// 中间件初始化
MiddleWare(app);

// token总路由验证
app.use(async (ctx, next) => {
    let params =Object.assign({}, ctx.request.query, ctx.request.body);
    ctx.request.header = {'authorization': "Bearer " + (params.token || '')}
    await next();
})

//业务路由初始化
Router(app);


app.listen(3000, () => {
    console.log('server is running at port 3000');
})