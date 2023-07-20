const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();
app.set('view engine', 'ejs')
const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'style')));

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening on port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  const title = 'Home'
  const basePath = createPath('index');
  res.status(200).render(basePath, { title });
});

app.get('/contacts', (req, res) => {
  const title = 'Contacts'
  const contacts = [
    { name: 'YoTube', link: 'https://www.youtube.com' },
    { name: 'LinkedIn', link: 'https://www.linkedin.com' },
    { name: 'GitHub', link: 'https://github.com'}
  ];
  const basePath = createPath('contacts');
  res.status(200).render(basePath, { contacts, title });
});

app.get('/about-us', (req, res) => {
  const basePath = createPath('contacts');
  res.status(301).redirect('/contacts');
});

app.get('/posts/:id', (req, res) => {
  const title = 'Post'
  const basePath = createPath('post');
  const post = {
    id: '1',
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    title: 'My post',
    author: 'Dzianis',
    date: '05.05.2023',
  }
  res.status(200).render(basePath, { title, post });
});
app.get('/posts', (req, res) => {
  const title = 'Posts';
  const basePath = createPath('posts');
  const posts = [
    {
      id: '1',
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      title: 'My post 1',
      author: 'Dzianis',
      date: '05.05.2023',
    },
    {
      id: '2',
      text: `Another post text here...`,
      title: 'My post 2',
      author: 'John',
      date: '10.05.2023',
    },
    {
      id: '3',
      text: `Yet another post text...`,
      title: 'My post 3',
      author: 'Alice',
      date: '15.05.2023',
    }
  ];

  res.status(200).render(basePath, { title, posts });
});

app.post('/add-post', (req, res) => {
  const { title, author, text } = req.body;
  const post = {
    id: new Date(),
    date: new Date().toLocaleDateString(),
    title,
    author,
    text
  }
  res.render(createPath('post'), { post, title });
});

app.get('/add-post', (req, res) => {
  const title = 'Add-Post'
  const basePath = createPath('add-post');
  res.status(200).render(basePath, { title });
});

app.use('*', (req, res) => {
  const title = '404 Not Found'
  const basePath = createPath('error');
  res.status(404).render(basePath, { title });
});
