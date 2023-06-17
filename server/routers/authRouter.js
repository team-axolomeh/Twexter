const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

const router = express.Router();
dotenv.config();

router.get('/', (req, res) => {
  console.log('~~~~~~~~Trying to redirect~~~~~~~~');
  return res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

router.get('/callback', async ({ query: { code } }, res, next) => {
  // Get the token
  // With the token, get the username
  console.log('~~~~~~~~Doing auth callback~~~~~~~~');
  // console.log(code);

  try {
    let fromGithub = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_SECRET,
          code,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const token = await fromGithub.text();

    fromGithub = await fetch('https://api.github.com/user', {
      type: 'POST',
      headers: {
        Authorization: 'Bearer ' + token.split('&')[0].split('=')[1],
      },
    });

    const githubUser = await fromGithub.json();
    console.log('Found user: ' + githubUser.login);
    console.log(githubUser);
    return res.redirect('/?user=' + githubUser.login);
  } catch (e) {
    return next({
      log: 'Failed to retrieve username from Github',
      status: 500,
      message: { err: 'Could not get username' },
    });
  }
});
module.exports = router;
