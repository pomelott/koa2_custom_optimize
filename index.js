const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const hostname = '127.0.0.1';
const port = 3000;



const server = http.createServer((req, res) => {
    // console.log(typeof req, typeof res)
    const pathname = url.parse(req.url).pathname;
    const extname = path.extname(pathname);
    // console.log(req.url, url.parse(req.url), pathname)
    console.log(pathname)
    res.statusCode = 200;
    if (pathname === '/') {
        res.writeHead(200, {
            'Content-Type': 'text-html'
        })
        res.end(fs.readFileSync(path.join(__dirname, pathname, 'index.html')))
    } else if (extname === '.jpg' || extname === '.png') {
        
        try {
            res.writeHead(200, {'Content-Type': 'image/' + extname.substr(1)});
            res.end(fs.readFileSync(path.join(__dirname, pathname)))
        } catch (err) {
            console.log(err)
            res.writeHead(404, {'Content-Type': 'plain/text'});
            res.end('err: no such file')
        }
        
    } else {
        res.setHeader('Content-Type', 'text-plain');
        res.end('hello, world\n')
    }
    
})

server.listen(port, hostname, () => {
    console.log(`服务器运行中。。。http://${hostname}:${port}`);
})