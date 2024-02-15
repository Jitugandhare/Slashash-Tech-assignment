// backend/app.js

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const mysql = require('mysql2');
require('dotenv').config();
const cors=require('cors')

const app = express();
app.use(cors());
// Database connection

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  console.log('Connected to the database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Routes
app.post('/api/search', async (req, res) => {
  const { query } = req.body;
  try {
    const response = await axios.get(`https://api.quotable.io/quotes?author=${query}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quotes' });
  }
});

app.post('/api/favorites', (req, res) => {
  const { quote, author } = req.body;
  const sql = 'INSERT INTO favorite_quotes (quote, author) VALUES (?, ?)';
  db.query(sql, [quote, author], (err, result) => {
    if (err) {
      console.error('Error saving favorite quote:', err.message);
      res.status(500).json({ error: 'Error saving favorite quote' });
      return;
    }
    res.status(201).json({ message: 'Favorite quote saved successfully' });
  });
});

app.get('/api/favorites', (req, res) => {
  const sql = 'SELECT * FROM favorite_quotes';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching favorite quotes:', err.message);
      res.status(500).json({ error: 'Error fetching favorite quotes' });
      return;
    }
    res.json(results);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
