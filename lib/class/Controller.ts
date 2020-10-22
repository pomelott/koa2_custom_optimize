import { Context } from 'koa';
import Base from './Base';
import { Connection } from 'typeorm';
export default class Controller extends Base {

    protected ctrlPath: any;
    protected render: any;
    protected init (ctx: Context, conn: Connection, ctrlPath?: string ) {
        this.ctx = ctx;
        this.conn = conn;
        this.ctrlPath = ctrlPath;
        this.render = ctx.render;
    }

}