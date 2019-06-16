const LoginController = require('../controller/login')
module.exports = (router, sign, secret) => {
    router
        .post('/login', LoginController.login)
}