const db = require('../models/twexterModel.js');
const userController = {};

userController.getUsernameFromCookie = (req, res, next) => {
  if (!res.locals.username) res.locals.username = req.cookies['twexter'];
  return next();
};

userController.findOrCreateUser = async (req, res, next) => {
  console.log(
    '~~~~~~~~~~~~~~~~Entering userController.createUser middleware~~~~~~~~~~~~~~~~~~'
  );

  //username retrieved from github in req.body.username
  // make query to see if username exists in database
  // if it doesn't, insert user into the table
  // next()
  // else save usernmae to res.locals
  // next() (next middleware would prob be findTwexta based on username)
  try {
    const queryFind = `SELECT users.* FROM users WHERE users.username = $1;`;
    const queryCreate = `INSERT INTO users (username) VALUES ($1);`;

    const result = await db.query(queryFind, [req.body.username]);
    const user = result.rows[0];
    if (user) {
      res.locals.user = user;
      return next();
    } else {
      const newUser = await db.query(queryCreate, [res.locals.username]);
      res.locals.user = newUser;
      return next();
    }
  } catch (err) {
    return next({
      log: 'Error: failure in userController.findUser -- ' + e,
      status: 400,
      message: { err: 'Failed to find user' },
    });
  }
};

userController.findUser = async (req, res, next) => {
  try {
    const queryFind = `SELECT * FROM users WHERE username=$1;`;
    const result = await db.query(queryFind, [req.body.username]);
    if (!result.rows.length) {
      return next({ err: 'no such user in findUser' });
    }
    const user = result.rows[0];
    res.locals.user = user;
    return next();
  } catch (e) {
    return next({
      log: 'Error: failure in userController.findUser -- ' + e,
      status: 400,
      message: { err: 'Failed to find user' },
    });
  }
};

module.exports = userController;
