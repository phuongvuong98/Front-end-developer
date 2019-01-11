const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHeader(200, {"Content-Type":"text/html"});
    res.write("<h1>Nguyen Phuong Vuong</h1>")
    res.end();
})

server.listen(3000);