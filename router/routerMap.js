

const EKController = require('../ek_modules/EKController')
let baseRouter;

module.exports = {
    init: (router) => {
        baseRouter = router;
    },
    map: (conf = {
        method: '',
        url: '',
        map:''
    }) => {
        let {method, url, map} = conf;
        console.log(method, url, map)
        baseRouter[method](url, async (ctx, next) => {
            console.log('enter')
            let module = require(map);
            new EKController(ctx, module)
        })
    }
}