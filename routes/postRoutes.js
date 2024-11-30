const express = require('express');
const { createPost, updatePost, deletePost,getAllPosts, getUserPosts } = require('../controllers/postController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();
// Protected Routes
router.post('/posts', authenticateToken, createPost);
router.put('/posts/:id', authenticateToken, updatePost);
router.delete('/posts/:id', authenticateToken, deletePost);
router.get('/posts', getAllPosts);
router.get('/user/posts', authenticateToken, getUserPosts);

module.exports = router;