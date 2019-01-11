const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url; // url === '/' by default
  const method = req.method; // method === GET by default

  if (url === '/') { 
    res.write('<html>');
    res.write('<head><title>Kax Message</title><head>');
    res.write(`
    <body>
      <form action="/message" method="GET">
        <label>Url: ${method}</label>
        <input type="text" name="message">
        <button type="submit">Send</button>
      </form>
    </body>`);

    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'GET') {
    fs.writeFileSync('message.txt', 'Kax is append');
    res.statusCode = 302; // tìm thấy
    res.setHeader('location', '/kax'); // chỉnh lại url khi đã chuyển trang
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);
