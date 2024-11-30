const db = require('../config/db');

exports.createPost = (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).send('Title and content are required');
  }

  const userId = req.user.id; // Extracted from the token
  const query = 'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)';
  db.query(query, [userId, title, content], (err, result) => {
    if (err) {
      console.error('Error creating post:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.status(201).send({ message: 'Post created successfully', postId: result.insertId });
  });
};

exports.updatePost = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).send('Title and content are required');
  }

  const userId = req.user.id; // Extracted from the token
  const query = 'UPDATE posts SET title = ?, content = ? WHERE id = ? AND user_id = ?';
  db.query(query, [title, content, id, userId], (err, result) => {
    if (err) {
      console.error('Error updating post:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (result.affectedRows === 0) {
      return res.status(404).send('Post not found or you are not authorized');
    }

    res.status(200).send({ message: 'Post updated successfully' });
  });
};

exports.deletePost = (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // Extracted from the token

  const query = 'DELETE FROM posts WHERE id = ? AND user_id = ?';
  db.query(query, [id, userId], (err, result) => {
    if (err) {
      console.error('Error deleting post:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (result.affectedRows === 0) {
      return res.status(404).send('Post not found or you are not authorized');
    }

    res.status(200).send({ message: 'Post deleted successfully' });
  });
};

exports.getAllPosts = (req, res) => {
  const query = 'SELECT * FROM posts';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching posts:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.status(200).send(results);
  });
};

// Get posts for the authenticated user
exports.getUserPosts = (req, res) => {
  const userId = req.user.id; // Extracted from token
  const query = 'SELECT * FROM posts WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user posts:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.status(200).send(results);
  });
};