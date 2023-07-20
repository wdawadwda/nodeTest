const http = require('http');
// http://localhost:3000
const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log('Server request');

  res.setHeader('Content-Type', 'application/json');
    // res.write('<head><link rel="stylesheet" href=#></head>');
  // res.write('<h1 style="text-align: center; display: block;">Hello</h1>');
  // res.write('<div style="text-align: center;">Hi</div>');
  // res.write('<div style="text-align: center;">Hi</div>');

  const data = JSON.stringify([{ name: 'Dzinais', age: 27 }, { name: 'Tommy', age: 35 }]);
  res.setHeader('Content-Length', Buffer.byteLength(data)); // Указываем длину данных
  res.statusCode = 200; // Устанавливаем статусный код 200 OK

  res.end(data); // Отправляем JSON-данные в теле ответа
});

server.listen(PORT, 'localhost', (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Listening on port ${PORT}`);
  }
});