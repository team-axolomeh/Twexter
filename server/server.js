// Import modules
const path = require('path');
const fs = require('fs');
const express = require('express');

const cookieParser = require('cookie-parser');
const db = require('./models/twexterModel.js');
const authRouter = require('./routers/authRouter.js');
const twextRouter = require('./routers/twextRouter.js');

const PORT = 3000;
// Instantiate app
const app = express();

// Parse bodies of incoming requests
app.use(express.json());
// Parse cookies of incoming requests
app.use(cookieParser());

app.use(express.static('../client'));
app.get('/', (req, res) => {
return res.sendStatus(200);
});

app.use('/auth', authRouter);
app.use('/twext', twextRouter);
// Handle unsupported routes
app.get('/*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
  // return res.status(404).json({ result: 'Not found' });
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
