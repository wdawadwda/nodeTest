const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const postsRouter = require('./routes/posts-routes')
const contactsRouter = require('./routes/contacts-routes')
const createPath = require('./helpers/createPath');
const postApiRoutes = require('./routes/api-posts-routes');
require('dotenv').config();

const db = ''


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log('Подключено к базе данных'))
  .catch((error) => console.error('Ошибка подключения к базе данных:', error));

const app = express();
app.set('view engine', 'ejs')


app.use(express.static(path.join(__dirname, 'style')));
app.use(methodOverride('_method'))

app.listen(process.env.PORT, (error) => {
  error ? console.log(error) : console.log(`Listening on port ${process.env.PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  const title = 'Home'
  const basePath = createPath('index');
  res.status(200).render(basePath, { title });
});

app.use(contactsRouter);
app.use(postsRouter);
app.use(postApiRoutes);

app.get('/about-us', (req, res) => {
  res.redirect('/contacts');
});

app.use('*', (req, res) => {
  const title = '404 Not Found'
  const basePath = createPath('error');
  res.status(404).render(basePath, { title });
});
