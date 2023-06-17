const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const authController = require('../controllers/authController.js');
const userController = require('../controllers/userController.js');

const router = express.Router();
dotenv.config();

router.get('/', (req, res) => {
  console.log('~~~~~~~~Trying to redirect~~~~~~~~');
  return res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

router.get(
  '/callback',
  authController.getGithubToken,
  authController.getGithubUsername,
  userController.findOrCreateUser,
  (req, res) => {
    return res.redirect(
      '/feed?user=' + encodeURIComponent(res.locals.user.login)
    );
  }
);
module.exports = router;
