const jwt = require('jsonwebtoken');
const db = require('../config/db');

const JWT_SECRET = 'your_secret_key';

exports.register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.status(201).send({ message: 'User registered successfully', id: result.insertId });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, result) => {
    if (err) {
      console.error('Error checking user credentials:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (result.length === 0 || result[0].password !== password) {
      return res.status(401).send('Invalid username or password');
    }

    const user = result[0];
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).send({ message: 'Login successful', userId: user.id, token });
  });
};