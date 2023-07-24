const express = require('express');
const router = express.Router();
const Contacts = require('../models/contacts');
const createPath = require('../helpers/createPath');

router.get('/contacts', (req, res) => {
  const title = 'Contacts';
  
  Contacts.find()
    .then((contacts) => {
      const basePath = createPath('contacts');
      res.status(200).render(basePath, { contacts, title });
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'));
    });
});

module.exports = router;
