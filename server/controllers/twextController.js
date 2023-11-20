const db = require("../models/twexterModel.js");
const { makeMWareBanner } = require("../utils.js");

const mwareBanner = makeMWareBanner("twextController");

const twextController = {};

twextController.getUsersTwexta = async (req, res, next) => {
  mwareBanner("getUsersTwexta");

  const QUERY = `SELECT u.*, t.content FROM users u JOIN twexta t ON t.user_id=u._id WHERE u.username=$1;`;
  const twexta = await db.query(QUERY, [res.locals.user._id]);
  res.locals.twexta = twexta.rows[0];
  return next();
};

twextController.getTwexta = async (req, res, next) => {
  mwareBanner("getTwexta");
  const QUERY = `SELECT u.*, t.content FROM users u JOIN twexta t ON t.user_id=u._id;`;
  const twexta = await db.query(QUERY);
  res.locals.twexta = twexta.rows;
  return next();
};

twextController.storeTwext = async (req, res, next) => {
  mwareBanner("storeTwext");
  // 1.0 Expect the user to come from the body
  // 2.0 Look up the user

  try {
    const storeTwextQuery = `INSERT INTO twexta (content, user_id) VALUES ($1, $2);`;
    const newTwext = await db.query(storeTwextQuery, [
      req.body.twextContent,
      res.locals.user._id,
    ]); //CONTENT STORED IN twextContent
    //user
    if (newTwext) res.locals.twextPostResult = "Stored the twext";
    else res.locals.twextPostResult = "DID NOT store the twext";

    return next();
  } catch (err) {
    return next({ err: "could not store text" });
  }
};

module.exports = twextController;
