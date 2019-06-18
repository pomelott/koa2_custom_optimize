const log4js = require('log4js');
const access = require("./access");
const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark'];
const baseInfo = {
    appLogLevel: 'debug',
    dir: 'log',
    env: 'dev',
    projectName: 'koa2-tutorial',
    serverIp: '0.0.0.0'
}
module.exports = (options) => {
    const contexLogger = {};
    const appenders = {};
    const opts = Object.assign({}, baseInfo, options || {});
    const {env, appLogLevel, dir, serverIp, projectName} = opts;
    const commonInfo = {projectName, serverIp};
    appenders.cheese = {
        type: 'dateFile',
        filename: `${dir}/task`,
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true
    }
    if (env=== 'dev' || env === 'development' || env === "local") {
        appenders.out = {
            type: 'console'
        }
    }
    let config = {
        appenders,
        categories: {
            default: {
                appenders: Object.keys(appenders),
                level: appLogLevel
            }
        }
    }
    log4js.configure(config)
    const logger = log4js.getLogger('cheese');
    
    return async (ctx, next) => {
        const start = Date.now();
        methods.forEach((method, index) => {
            contexLogger[method] = (message) => {
                logger[method](access(ctx, message, commonInfo))
            }
        })
        ctx.log = contexLogger;
        await next();
        const end = Date.now();
        const responseTime = end - start;
        ctx.log.info(access(ctx, {
            responseTime: `响应时间为${responseTime/1000}s`
        }, commonInfo))
        // logger.info(`响应时间为${ResponseTime/1000}s`)
    }
}