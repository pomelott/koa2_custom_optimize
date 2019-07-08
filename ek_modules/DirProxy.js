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
        console.log(baseDir, baseFile)
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
                
                // let baseDir = _this.dir.length ? `../controller/${_this.dir.join('/')}` : `../controller`;
                let baseDir = path.relative(__dirname, `c:/FE/nodeFile/node_base_learn/${_this.dir.join('/')}`);
                // let baseDir = path.resolve(__dirname, '../controller');
                let ctrPath = path.resolve(__dirname, baseDir)
                console.log(11)
                console.log(ctrPath)
                let targetCtr = DirProxy.getFile(ctrPath);
                // if (!targetCtr) {
                //     console.error(`Error: wrong path with '${ctrPath}' !`)
                //     return false;
                // } else if (targetCtr === 'dir') {
                //     return new Proxy({path: _this.dir}, handler);
                // } else {
                //     return require(ctrPath + '.js')
                // }
                if (targetCtr == 'dir') {
                    return new Proxy({path: _this.dir}, handler);
                } else {
                    return require(ctrPath)
                }
                
                
                
            },
            set (target, key, value, receiver) {
                // console.log(key)
                return new Proxy({}, handler);
            },
            construct: function(target, args) {
                // console.log(ctrPath)
            }
        }
        return new Proxy({path: _this.dir}, handler)
    }
    
}
module.exports = DirProxy