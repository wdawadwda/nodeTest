const http = require('http');
const fs = require('fs');
const path = require('path');

// http://localhost:3000

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log('Server request');

  res.setHeader('Content-Type', 'text/html');

  let basePath;

  const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

  switch (req.url) {
    case '/':
    case '/home':
    case '/index':
      basePath = createPath('index');
      res.statusCode = 200;
      break;
    case '/contacts':
      basePath = createPath('contacts');
      res.statusCode = 200;
      break;
    case '/about-us':
      basePath = createPath();
      res.statusCode = 301;
      res.setHeader('Location', '/contacts')
      res.end()
      break;
    default:
      basePath = createPath('error');
      res.statusCode = 404;
      break;
  }

  fs.readFile(basePath, (err, data) => {
    if (err) {
      console.log(err);
      res.statusCode = 500;
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(PORT, 'localhost', (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Listening on port ${PORT}`);
  }
});
