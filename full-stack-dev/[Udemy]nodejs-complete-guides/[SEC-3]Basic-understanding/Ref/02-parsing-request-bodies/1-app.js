const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    var url = req.url;
    var method = req.method;

    if (url === '/'){
        res.write(`
        <html>
        <head>
            <title>Message</title>
        </head>
        <body>
            <form action="/mess" method="POST">
                <input type="text" name="message">
                <input type="submit" value="Submit">
            </form>
        </body>
        </html>
        `);
        return res.end();
    }

    if (url === '/mess' && method === "POST"){
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk); 
            body.push(chunk);
        });

        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            console.log(parseBody);
            // RegEx: g is find all and i is case-insensitive(meaning uppering and lowering as being the same).
            const content = parseBody.split('=')[1].replace(/\+/gi, " ");
            fs.writeFile('secondFile.txt', content, 'utf-8', err => {
                res.statusCode = 302;
                res.setHeader('location', '/');
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/plain');
    res.write('Hello Nodejs');
    return res.end();
});

server.listen(3000);