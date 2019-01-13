const http = require('http');

const server = http.createServer((req, res) => {
    var url = req.url;
    var method = req.method;

    if (url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write(`
        <html>
            <head>
                <title>Create User</title>
            </head>
            <body>
                <form action="/create-user" method="POST">
                    Username<input type="text" name="username">
                    <input type="submit" value="Submit">
                </form>
            </body>
        </html>
        `);
        return res.end();
    }

    if (url === '/create-user' && method === "POST"){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const user = parseBody.split('=')[1].replace(/\+/gi, ' ');
            console.log(user);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    if (url === '/users'){
        res.setHeader('Content-Type', 'text/html');
        res.write(`
        <html>
            <head>
                <title>Create User</title>
            </head>
            <body>
                <ul>
                    <li>User1</li>
                    <li>User2</li>
                </ul>
            </body>
        </html>
        `);
        return res.end();
    }
});

server.listen(3000);