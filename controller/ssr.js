const Vue = require('vue');
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('../template/index.template.html', 'utf-8');
});
module.exports = {
    testssr: async (ctx, next) => {
        let app = new Vue({
            data: {
                url: ctx.request.url
            },
            template: `<div>url is {{url}}</div>`
        })


        renderer.renderToString(app, (err, html) => {
            if (err) {
                ctx.response.body = 'internal server error'
            }
            console.log(html)
            // ctx.render('product/ssr', {html})
            ctx.response.header = {'Content-Type': 'text/html'}
            ctx.res.end(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Document</title>
            </head>
            <body>
                ${html}
            </body>
            </html>`)
         })
    }
}