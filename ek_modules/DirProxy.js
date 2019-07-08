const path = require('path');
const fs = require('fs');
class DirProxy {
    constructor (root) {
        this.dir = [root];
    }

    static getFile (baseDir) {
        const baseFile = baseDir + '.js';
        let targetDir = null,
            targetFile = null;
        try {
            targetDir = fs.statSync(baseDir);
            
        } catch (err) {}
        try {
            targetFile = fs.statSync(baseFile);
        } catch (err) {}
        // console.log(baseDir, baseFile)
        if (targetDir || targetFile) {
            if (targetDir && targetDir.isDirectory()) {
                return 'dir'
            }
            if (targetFile && targetFile.isFile()) {
                return 'file'
            }
            return false;
        } else {
            return false;
        }
    }

    
    init () {
        let _this = this;
        let handler = {
            get (target, key, receiver) {
                console.log('dirproxy')
                console.log(key)
                // key可能会是Symbol(nodejs.util.inspect.custom)
                if (key && Object.prototype.toString.call(key) === '[object String]') {
                    _this.dir.push(key)
                }
                // c:/FE/nodeFile/node_base_learn/ 为项目根目录
                let baseDir = path.relative(__dirname, `c:/FE/nodeFile/node_base_learn/${_this.dir.join('/')}`);                
                let ctrPath = path.resolve(__dirname, baseDir)
                let targetCtr = DirProxy.getFile(ctrPath);
                if (targetCtr == 'dir') {
                    return new Proxy({path: _this.dir}, handler);
                } else {
                    // 根基commonjs的模块解析规则可直接引入目录或js文件
                    return require(ctrPath)
                }
            },
            set (target, key, value, receiver) {
                return false;
            },
            construct: function(target, args) {
                return false;
            }
        }
        return new Proxy({path: _this.dir}, handler)
    }
    
}
module.exports = DirProxy