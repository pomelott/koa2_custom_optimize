const multer = require('koa-multer');
const upload = multer({
    dest: '../upload/'
})
const multerUpload = upload.single('avatar')
module.exports = {
    uploadIndex: async (ctx, next) => {
        await ctx.render('upload')
    },
    sendFile: async (ctx, next) => {
        console.log(ctx.request.files)
        ctx.send({status: 0, file: ctx})
    }
}