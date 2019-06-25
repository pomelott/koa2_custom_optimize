const Vue = require('vue');
const path = require('path');
const renderer = require('vue-server-renderer').createRenderer();
const app = require('../dist/server.js')
const clientBundleFileUrl = path.join(__dirname, '../dist/client.js');
// let app = createApp();
// console.log(app)
module.exports = {
    testssr: async (ctx, next) => {
        // let app = new Vue({
        //     data: {
        //         url: ctx.request.url
        //     },
        //     template: `<div>url is {{url}}</div>`
        // })



        // const context = {
        //     title: 'test ssr',
        //     meta: `<meta charset="UTF-8">
        //             <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //             <meta http-equiv="X-UA-Compatible" content="ie=edge">`
        // }
        // const
        // renderer.renderToString(app).then((err, html) => {
        //     console.log(html)
        // })
        renderer.renderToString(app, (err, html) => {
            console.log(html)
            ctx.response.header = {'Content-Type': 'text/html'}
            // ctx.res.end(html);
            // if (err) { return res.state(500).end('运行时错误') }
            ctx.res.end(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Vue2.0 SSR渲染页面</title>
                    <script src="${clientBundleFileUrl}"></script>
                </head>
                <body>
                    <div id="app">${html}</div>
                </body>
            </html>
        `)
           
        })
    }
}