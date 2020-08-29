import Koa from 'koa';
import initRouter from './initRouter';
export default (routerModule: object) => {

    const app = new Koa();
    initRouter(app)
}

