const Post = require('../models/post');
const createPath = require('../helpers/createPath');

const getPost = (req, res) => {
  const title = 'Post';
  const basePath = createPath('post');
  Post.findById(req.params.id)
    .then((post) => {
      if (!post) {
        res.status(404).render(createPath('error'), { title: 'Post not found' });
      } else {
        res.status(200).render(basePath, { title, post });
      }
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title });
    });
};

const deletePost = (req, res) => {
  const title = 'Post';
  const basePath = createPath('post');
  Post.findByIdAndDelete(req.params.id)
    .then((post) => {
      if (!post) {
        return res.status(404).render(createPath('error'), { title: 'Post not found' });
      }
      return res.status(200).json({ message: 'Post deleted successfully' });
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title });
    });
};

const getPosts = (req, res) => {
  const title = 'Posts';
  const basePath = createPath('posts');
  Post.find()
    .sort({ createdAt: -1 })
    .then((posts) => {
      res.status(200).render(basePath, { title, posts });
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'));
    });
};

const addPost = (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });
  post
    .save()
    .then((result) => {
      res.redirect('/posts');
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'));
    });
};

const getAddPost = (req, res) => {
  const title = 'Add-Post'
  const basePath = createPath('add-post');
  res.status(200).render(basePath, { title });
};

const getEdiPost = (req, res) => {
  const title = 'Edit Post';
  const basePath = createPath('edit-post');
  Post.findById(req.params.id)
    .then((post) => {
      if (!post) {
        res.status(404).render(createPath('error'), { title: 'Post not found' });
      } else {
        res.status(200).render(basePath, { title, post });
      }
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title });
    });
};

const putEdiPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;
  Post.findByIdAndUpdate(id, { title, author, text })
    .then((post) => {
      if (!post) {
        res.status(404).render(createPath('error'), { title: 'Пост не найден' });
      } else {
        res.redirect(`/posts/${id}`);
      }
    })
    .catch((error) => {
      console.log(error);
      res.render(createPath('error'), { title: 'Ошибка при обновлении поста' });
    });
};

module.exports = {
  getPost,
  deletePost,
  getPosts,
  addPost,
  getAddPost,
  getEdiPost,
  putEdiPost
};