import initRouter from '../scripts/initRouter'
import Koa from 'koa';
import serverConf from  '../conf/server'
export default class Launcher {
    private _app: Koa;
    constructor () {
        this._app = new Koa();
        this._init()
    }

    private _init () {
        initRouter(this._app).then(() => {
            this._listen();
        })
    }

    private _listen () {
        this._app.listen(serverConf.port, () => {
            console.log(serverConf.notice)
        })
    }
}