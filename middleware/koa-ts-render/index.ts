import { Context } from "vm";
import { Next } from "koa";
import fs from 'fs';
import {render} from 'nunjucks';
import path from 'path';
import pugConf from '../../lib/conf/pug';
import { viewDir } from "lib/conf/dir";

async function renderTpl (this:Context, filePath: string, values: {}): Promise<any> {
    const targetPath = path.resolve(viewDir, filePath);
    const htmlStr = await render(targetPath, values);
    this.response.body = htmlStr;
}

export default (ctx: Context, next: Next) => {

// 编译出一个函数


// 渲染它
    // var html = fn({
    //     name: 'tate'
    // });
    // ctx.response.body = html;
    ctx.render = renderTpl.bind(ctx);
    next();
}