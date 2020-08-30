import Router from "koa-router";
import 'koa-router';
import {DirectoryModule, LayerEsModule} from 'import-esm-directory';
import {ctrlDir} from '../conf/dir';
import path from 'path';
import { Context } from "koa";
import { Connection } from "typeorm";
import specificRouterMiddlewarePromise from '../../routerMiddleware/specific';
import globalRouterMiddlewarePromise from '../../routerMiddleware/global';
const sep = path.sep;
interface RouterExportInterface {
    [key: string]: {
        keyName: string;
        controller?: string;
        type?: string;
        route: string;
        middleware: Array<string>;
    };
}
interface RouterExportItemInterface {
    keyName: string;
    controller: string;
    type: 'post' | 'get' | 'put' | 'delete' | 'del' | 'link' | 'unlink' | 'options' | 'head';
    route: string;
    middleware: Array<string>;
}
// interface layerEsModule 
function isRouterExportModule (filepath: string, module: RouterExportInterface) {

    for (let key in module) {
        if (!module[key].route) {
            console.log(`expect the 'path' param in module '${filepath}' with '${key}', got undefined !`)
            return false;
        }
    }
    return true;
}

function makeMap (filepath: string, module: RouterExportInterface): void {
    // console.log(module)
        for (let key in module) {
            module[key].keyName = key;
            if (!isRouterExportModule(filepath, module)) {
                process.exit(1)
            }
            if (!module[key].type) {
                module[key].type = 'get';
            } else {
                module[key].type = module[key].type?.toLowerCase();
            }
            if (!module[key].controller) {
                module[key].controller = `${ctrlDir}${sep}${filepath}`
            } else {
                // 自定义 controller.user.priority
                module[key].controller = `${ctrlDir}${module[key].controller?.replace(/\./g, '/')}`
            }
        }
}

function getTargetRouterMiddleware (middleWare: Array<string>, allMiddleware: LayerEsModule) : Array<any>{
    let temp: Array<any> = [];
    middleWare.forEach((item) => {
        let target = allMiddleware[item.replace('.', '/')];
        temp.push(target)
    })
    return temp;
}

async function getGlobalRouterMiddleware () {
    let globalRouterMiddleware = (await globalRouterMiddlewarePromise).layerModule;
    let temp: Array<any> = [];
    for (let key in globalRouterMiddleware) {
        temp.push(globalRouterMiddleware[key])
    }
    return temp;
}

export default (router: Router, routerModule: DirectoryModule, conn: Connection): void => {
    const layerModule = routerModule.layerModule;
    for (let key in layerModule) {
        makeMap(key, layerModule[key]);
        (async (layerItemModule) => {
            let routerMiddleware = (await specificRouterMiddlewarePromise).layerModule;
            let targetGlobalMiddleware = await getGlobalRouterMiddleware();
            for (let key in layerItemModule) {
                let {type, route, controller, keyName, middleware} = layerItemModule[key] as RouterExportItemInterface;
                let ControllerClass = await import(controller);
                middleware = middleware ? middleware : [];
                let targetRouterMiddleware = getTargetRouterMiddleware(middleware, routerMiddleware);
                router[type](route, ...targetGlobalMiddleware, ...targetRouterMiddleware, async (ctx: Context, next: Function) => {
                    let ctrl = new ControllerClass.default;
                    ctrl.init(ctx, conn, controller);
                    ctrl.bindValue();
                    await ctrl[keyName]();
                    next();
                })
            }
        })(layerModule[key])
    }
}