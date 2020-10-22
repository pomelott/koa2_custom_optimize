import { Context } from "vm";
import { Next } from "koa";
import pug, {Options} from 'pug';
import path from 'path';
import pugConf from '../../lib/conf/pug';

function renderPugTpl (this:Context, filePath: string, values: {}): void {
    const targetPath = path.join(pugConf.basePath, filePath)
    const renderFn = pug.compileFile(targetPath, pugConf as Options);
    this.response.body = renderFn(values);
    return;
}

export default (ctx: Context, next: Next) => {

// 编译出一个函数


// 渲染它
    // var html = fn({
    //     name: 'tate'
    // });
    // ctx.response.body = html;
    ctx.render = renderPugTpl.bind(ctx);
    next();
}