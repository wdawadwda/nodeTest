const express = require('express');
const router = express.Router();
const { getPost, deletePost, getPosts, addPost, putEditPost } = require('../controllers/api-post-controller');

router.get('/api/posts', (getPosts));

router.post('/api/add-post', (addPost));

router.get('/api/post/:id', (getPost));

router.delete('/api/post/:id', (deletePost));

router.put('/api/post/:id', (putEditPost));

module.exports = router;
