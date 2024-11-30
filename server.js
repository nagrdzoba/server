const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');


dotenv.config();

const app = express();
app.use(bodyParser.json());

// Use routes
app.use('/api', postRoutes);
app.use('/api', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});