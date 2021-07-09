import Router from 'koa-router';
import "reflect-metadata";
import {createConnection} from "typeorm";
import Koa from 'koa';
import routerModulePromise from '../../router';
import mapRouter from '../../lib/scripts/mapRouter';
import {User} from '../../orm/entities/User';
import middleware from '../../middleware';
import dbConf from '../conf/db';
import defaultPageMiddleware from '../../middleware/defaultPage';
import { LayerEsModule } from 'import-esm-directory';
import { Console } from 'console';
const {host, port, username, password, database} = dbConf;
export default async (app: Koa): Promise<boolean> => {
    const routePool: Array<string> = [];
    return new Promise(async (resolve) => {
        createConnection({
            type: "mysql",
            host,
            port,
            username,
            password,
            database,
            entities: [User]
        }).then(async connection => {
            const router = new Router();
            const routerModule: any = await routerModulePromise;

            // 暂存路由
            for (let dirKey in routerModule.layerModule) {
                let layerItem = routerModule.layerModule[dirKey];
                for (let routeKey in layerItem) {
                    let routeItem = layerItem[routeKey];
                    routePool.push(routeItem.route);
                }
            }

            middleware.forEach((middlewareItem) => {
                app.use(middlewareItem);
            })
            app
                .use(router.routes())
                .use(router.allowedMethods())

            // 命中已有路由
            mapRouter(router, routerModule, connection)

            // 非命中路由做错误处理
            app
                .use(defaultPageMiddleware(routePool));
            resolve(true)
        }).catch(error => console.log("TypeORM connection error: ", error));
    })
}