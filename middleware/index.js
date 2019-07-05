const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const path = require('path');
const nunjucks = require('koa-nunjucks-2');
const pomeloSend = require('./pomelo-send');
const koaBody = require('koa-body');
const miLog = require('./mi-log');
const miHttpErr = require('./mi-http-error');
const miFileMap = require('./mi-file-map')
module.exports = (app) => {
    // 模板引擎配置，view资源位置配置
    // ejs模板引擎
    // app.use(views(__dirname + '/views', {
    //     map: {html: 'ejs'}
    // }))


    // 代码结构映射
    // miFileMap({
    //     app,
    //     rules: [{ //指定controller文件夹下的js文件，挂载在app.controller属性
    //             folder: path.join(__dirname, '../controller'),
    //             name: 'controller'
    //         },
    //         { // 指定service文件夹下的js文件，挂载在app.service属性
    //             folder: path.join(__dirname, '../service/model'),
    //             name: 'model'
    //         },
    //         { // 指定service文件夹下的js文件，挂载在app.service属性
    //             folder: path.join(__dirname, '../service/transactions'),
    //             name: 'tp'
    //         },
    //     ]
    // });

    app

        .use(miLog())
        .use(miHttpErr(nunjucks, path))
        // nunjucks模板引擎
        .use(nunjucks({
            ext: 'html',
            path: path.join(__dirname, '../views'),
            nunjucksConfig: {
                trimBlocks: true
            }
        }))
        
    // 静态资源位置配置
        .use(static(path.join(__dirname, '/static')))
        .use(bodyParser({
            extendTypes: {
                json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
            }
        }))
        .use(pomeloSend())
        .use(koaBody({
            multipart: true,
            formidable: {
                maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
            }
        }))
    
}