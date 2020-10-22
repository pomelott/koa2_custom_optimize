import path from 'path';
const sep = path.sep;
interface ParseParamInterface {
    [key: string]: number|string;
}

export function paramParser (argv: Array<string>, defaultParam: ParseParamInterface): ParseParamInterface {
    let params: Array<string> = process.argv.splice(2);
    params.forEach((item) => {
        const [key, val] = item.split('=');
            defaultParam[key] = val;
    })
    return defaultParam;
}

export async function dirRouter (modulePath: string, baseDir: string): Promise<any> {
    let filterPath = modulePath.replace(/\./g, sep);
    let targetModel = path.resolve(baseDir, filterPath);
    return await import(targetModel);
}