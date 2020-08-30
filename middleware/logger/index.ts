import { Context } from "vm";
import { Next } from "koa";
// import log4js from 'log4js';
import { configure, getLogger, Logger } from "log4js";
export default async (ctx: Context, next: Next) => {
    console.log('[middleware]: logger middleware');
    let date = new Date();
    let yearDir = date.getFullYear();
    let monthDir = date.getMonth() + 1;
    configure({
        appenders: { 
            main: {
                type: 'dateFile',
                filename: `log/${yearDir}/${monthDir}/task`,
                pattern: 'yyyy-MM-dd.log',
                alwaysIncludePattern: true
            },
            debug: {
                type: 'stdout',
                // filename: 'log/debug.log'
            }
        },
        categories: { default: { appenders: ["main", "debug"], level: "debug" } },
        pm2: true
    });
    const logger = getLogger('main');
    const debug: Logger = getLogger('debug');
    debug.level = 'trace';
    logger.level = "debug";
    ctx.logger = logger;
    ctx.debug = debug;
    // logger.debug("Some debug messages");
    await next();
}