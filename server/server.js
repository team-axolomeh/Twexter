// Import modules
const path = require('path');
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');

const PORT = 3000;

// Instantiate app
const app = express();

// Parse bodies of incoming requests
app.use(express.json());
// Parse cookies of incoming requests
app.use(cookieParser());

// Handle unsupported routes
app.use('*', (req, res) => {
  return res.status(404).json({ result: 'Not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  // Default error object
  const defaultErr = {
    log: 'Error: failure in unknown middleware',
    status: 400,
    message: { err: 'An error occurred' },
  };

  // Reassign the object
  err = Object.assign({}, defaultErr, err);
  // Log its log
  console.log(err.log);
  // Return a response
  return res.status(err.status).json(err.message);
});

app.listen(PORT, () => {
  console.log('~~~~~~~~Server Starting~~~~~~~~~');
  console.log(`Listening on port: ${PORT}`);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
});
