const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const postApiRoutes = require('./routes/api-posts-routes');
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log('Подключено к базе данных'))
  .catch((error) => console.error('Ошибка подключения к базе данных:', error));

const app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.urlencoded({ extended: false }));

app.use(postApiRoutes);

app.listen(process.env.PORT, (error) => {
  error ? console.log(error) : console.log(`Listening on port ${process.env.PORT}`);
});
