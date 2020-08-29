import Router from 'koa-router';
import "reflect-metadata";
import {createConnection} from "typeorm";
import Koa from 'koa';
import routerModulePromise from '../../router';
import mapRouter from '../../lib/scripts/mapRouter';
import {User} from '../../orm/entities/User';
import middleware from '../../middleware';
import dbConf from '../conf/db';
const {host, port, username, password, database} = dbConf;
export default async (app: Koa): Promise<boolean> => {
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
            middleware.forEach((middlewareItem) => {
                app.use(middlewareItem);
            })
            app
                .use(router.routes())
                .use(router.allowedMethods())
            mapRouter(router, routerModule, connection)
            resolve(true)
        }).catch(error => console.log("TypeORM connection error: ", error));
    })
}