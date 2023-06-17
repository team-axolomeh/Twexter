const db = require('../models/twexterModel.js');

const twextController = {};

twextController.getUsersTwexta = async (req, res, next) => {
  const QUERY = `SELECT u.*, t.content FROM users u JOIN twexta t ON t.user_id=u._id WHERE u.username=$1`;
  const twexta = await db.query(QUERY, [res.locals.user._id]);
  res.locals.twexta = twexta.rows[0];
  return next();
};

twextController.getTwexta = async (req, res, next) => {
  const QUERY = `SELECT u.*, t.content FROM users u JOIN twexta t ON t.user_id=u._id;`;
  const twexta = await db.query(QUERY);
  res.locals.twexta = twexta.rows;
  return next();
};

twextController.storeTwext = async (req, res, next) => {
  try {
    const storeTwextQuery = 'INSERT INTO twexta (content) ';
  } catch (err) {}
};

module.exports = twextController;
