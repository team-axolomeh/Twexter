const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

const router = express.Router();
dotenv.config();

router.get('/', (req, res) => {
  console.log('~~~~~~~~Trying to redirect~~~~~~~~');
  return res
    .status(200)
    .json({
      link: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
    });
});

router.get('/callback', ({ query: { code } }, res) => {
  fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    body: {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_SECRET,
      code,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((_res) => _res.data.access_token)
    .then((token) => {
      // eslint-disable-next-line no-console
      console.log('My token:', token);

      res.redirect(`/?token=${token}`);
    })
    .catch((err) => res.status(500).json({ err: err.message }));
});
module.exports = router;
