const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).send('Access Denied: No Token Provided');

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid Token');

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;