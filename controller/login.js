// const LoginService = require('../service/db/login');
module.exports = {
    login: async (ctx, next) => {
        const user = ctx.request.body;
        if (user && ctx.db.LoginService.getTokenAuthentic('tate')) {
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
    }
}