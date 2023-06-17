const dotenv = require('dotenv');
const authController = {};

authController.getGithubToken = async ({ query: { code } }, res, next) => {
  console.log('~~~~~~~~Entering authController.getGithubToken~~~~~~~~');
  // console.log(code);

  try {
    const fromGithub = await fetch(
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
    res.locals.token = token;
    return next();
  } catch (e) {
    return next({
      log: 'Error: failure in authController.getGithubToken -- ' + e,
      status: 400,
      message: { err: 'Was not able to get token from GitHub' },
    });
  }
};
authController.getGithubUsername = async (req, res, next) => {
  console.log('~~~~~~~~Entering authController.getGithubUsername~~~~~~~~');

  const { token } = res.locals;

  try {
    const fromGithub = await fetch('https://api.github.com/user', {
      type: 'POST',
      headers: {
        Authorization: 'Bearer ' + token.split('&')[0].split('=')[1],
      },
    });

    const githubUser = await fromGithub.json();
    console.log('Found user: ' + githubUser);

    // res.cookie('twexter', githubUser.login, { httpOnly: true });
    res.locals.username = githubUser.login;
    return next();
  } catch (e) {
    return next({
      log: 'Error: failure in authController.getGithubUsername -- ' + e,
      status: 400,
      message: { err: 'Failed to retrieve username from Github' },
    });
  }
};

module.exports = authController;
