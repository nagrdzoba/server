// /config/db.js or /database/db.js
const mysql = require('mysql2');

// Database connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',  // fallback to 'localhost' if no environment variable
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Aka400@8',
  database: process.env.DB_NAME || 'userdb'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Could not connect to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = db;