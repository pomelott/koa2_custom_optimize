import {dirRouter} from '../util/index';
import {modelDir, serviceDir} from '../conf/dir';
import {getConnection, Connection} from 'typeorm';
import { Context } from 'koa';
export default class {
    protected queryRunner: any;
    protected ctx: any;
    protected conn: any;
    protected request: any;
    protected response: any;
    protected app: any;
    protected originalUrl: any;
    protected req: any;
    protected res: any;
    protected socket: any;

    protected init (ctx: Context, conn: Connection) {
        this.ctx = ctx;
        this.conn = conn;
    }

    protected bindValue () {
        if (this.ctx) {
            this.request = this.ctx.request;
            this.response = this.ctx.response;
            this.app = this.ctx.app;
            this.originalUrl = this.ctx.originalUrl;
            this.req = this.ctx.req;
            this.res = this.ctx.res;
            this.socket = this.ctx.socket;
        }
    }

    protected async model (modelPath: string) {
        let importModule = await dirRouter(modelPath, modelDir);
        let modelInstance;
        if (importModule.default) {
            modelInstance = new importModule.default();
            modelInstance.init(this.ctx, this.conn);
            modelInstance.bindValue();
            return modelInstance;
        } else {
            console.log('model err')
        }
    }

    protected async service (servicePath: string) {
        let importService = await dirRouter(servicePath, serviceDir);
        let serviceInstance;
        if (importService.default) {
            serviceInstance = new importService.default();
            serviceInstance.init(this.ctx, this.conn);
            serviceInstance.bindValue();
            return serviceInstance;
        } else {
            console.log('service err')
        }
    }

    protected async getQueryRunner () {
        let connection = getConnection();
        let queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        return queryRunner;
    }

}