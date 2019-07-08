const path = require('path');
const fs = require('fs');
const DirProxy = require('./DirProxy');

function getFile (baseDir) {
    
    const baseFile = baseDir + '.js';
    let targetDir = null,
        targetFile = null;
        console.log(baseDir, baseFile)
    try {
        targetDir = fs.statSync(baseDir);
        
    } catch (err) {
        // new Error(err)
    }
    try {
        targetFile = fs.statSync(baseFile);
    } catch (err) {
        // console.log(err);
    }
    
    // console.log(path.resolve(__dirname, '../controller/hw/test.js'))
    // console.log(fs.statSync(path.resolve(__dirname, '../controller/hw/test.js')))
    if (targetDir || targetFile) {
        // console.log(targetDir, targetFile)
        if (targetDir && targetDir.isDirectory()) {
            return 'dir'
        }
        if (targetFile && targetFile.isFile()) {
            return 'file'
        }
        return 'test`111111111111111111'
    } else {
        return false;
    }
}


module.exports = ((app) => {
    let dir = [];
        
    let handler = {
        get (target, key, receiver) {
            console.log(key)
            // key可能会是Symbol(nodejs.util.inspect.custom)
            if (key && Object.prototype.toString.call(key) === '[object String]') {
                dir.push(key)
            }
            try {
                let baseDir = dir.length ? `../controller/${dir.join('/')}` : `../controller`;
                // let baseDir = path.resolve(__dirname, '../controller');
                let ctrPath = path.resolve(__dirname, baseDir)
                let targetCtr = getFile(ctrPath);
                
                // console.log(key)
                
                console.log(targetCtr)
                
                if (!targetCtr) {
                    throw new Error('wrong path !')
                } else if (targetCtr === 'dir') {
                    return new Proxy({path: dir}, handler);
                } else {
                    
                    // console.log(require(`f:\\node_base_learn-master\\node_base_learn-master\\controller\\hw\\test.js`))
                    // console.log(ctrPath + '.js')
                    // dir.length = 0;
                    return require(ctrPath + '.js')
                }
            } catch (err) {
                console.log(err)
            }
            
            
        },
        set (target, key, value, receiver) {
            console.log(key)
            return new Proxy({}, handler);
        },
        construct: function(target, args) {
            console.log(ctrPath)
          }
    }
    app.controller = new Proxy({path: dir}, handler)
    
})