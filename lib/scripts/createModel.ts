import path from 'path';
import {exec} from 'child_process';
import {paramParser} from '../util';
import dbConf from '../conf/db';
let cmd: string;
let parseParam = paramParser(process.argv, {
    port: '3306',
    user: 'root',
    output: path.resolve(__dirname, '../../orm'),
    db: 'koa_test',
    engine: 'mysql',
    lang: 'ts'
});

let {host, port, user, pwd, db, output, engine, lang} = parseParam;
host = host || dbConf.host;
port = port || dbConf.port;
user = user || dbConf.username;
pwd = pwd || dbConf.password;
if (!host || !pwd) {
    console.error('Error: param host and pwd needed !! user <npm run create-mode host=x.x.x.x pwd=xxxx> to retry !');
    process.exit(1);
}
try {
    cmd = `npx typeorm-model-generator -o "${output}" -d ${db} -h ${host} -u ${user} -p ${port} -x ${pwd} -e ${engine}`;
    console.log(`now execute <${cmd}"> \n`);
    exec(cmd, (err, stderr, stdout) => {
       err && console.log(err);
       stderr && console.log(stderr);
       stdout && console.log(stdout);
    })
} catch (err) {
    console.log(err);
}
