const { Router } = require('express');
const router = Router();

const { createPost, getPost, deletePost, getPosts, updatePost } = require('../controllers/post.controller');

router.get('/', getPosts);

router.get('/:id', getPost);

router.post('/', createPost);

router.put('/:id', updatePost);

router.get('/delete/:photo_id', deletePost);

module.exports = router;