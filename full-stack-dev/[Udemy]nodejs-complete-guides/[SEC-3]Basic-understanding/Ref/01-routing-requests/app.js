const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  var url = req.url; // get url and method which client submitted for server.
  var method = req.method;

  console.log(url);

  if (url === '/'){
    res.write('<html>');    
    res.write('<body>');
    res.write('<form action="/message" method="POST">');
    res.write('<input type="text" name"text">');
    res.write('<input type="submit" value="Submit">');
    res.write('</form>');
    res.write('</body>');    
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method === "POST"){
    fs.writeFileSync('kax.txt', 'Hu hu cai nao', 'utf-8');
    res.setHeader("Content-type", 'text/plain');
    res.statusCode = 302;
    res.write('Save file sucessfully.');
    return res.end();
  }

});

server.listen(3000);