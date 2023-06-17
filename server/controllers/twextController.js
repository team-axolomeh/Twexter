const db = require('../models/twexterModel.js');

const twextController = {};

twextController.getUsersTwexta = async (req, res, next) => {
  const QUERY = `SELECT u.*, t.content FROM users u JOIN twexta t ON t.user_id=u._id WHERE u.username=$1`;
  const twexta = await db.query(QUERY, [res.locals.user._id]);
  res.locals.twexta = twexta.rows[0];
  return next();
};

module.exports = twextController;
