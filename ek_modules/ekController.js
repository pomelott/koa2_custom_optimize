module.exports = (app) => {
    let fileArr = [];
    let handler = {
        get (target, key, receiver) {
            console.log('get')
            console.log(target, key, receiver)
            target[key] = {};
            // return new Proxy({}, handler);
        },
        set (target, key, value, receiver) {
            console.log('set')
            console.log(target, key, value, receiver)
            target[key] = {};
            // return new Proxy({}, handler);
        }
    }
    app.controller = new Proxy({}, handler)

}