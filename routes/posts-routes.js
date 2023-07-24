const express = require('express');
const router = express.Router();
const { getPost, deletePost, getPosts, addPost, getAddPost, getEdiPost, putEdiPost } = require('../controllers/post-controller');

router.get('/edit-post/:id', (getEdiPost));

router.put('/edit-post/:id', (putEdiPost));

router.get('/posts/:id', (getPost));

router.delete('/posts/:id', (deletePost));

router.get('/posts', (getPosts));

router.post('/add-post', (addPost));

router.get('/add-post', (getAddPost));

module.exports = router;
