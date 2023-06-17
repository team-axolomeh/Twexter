const router = require('express').Router();

const twextController = require('../controllers/twextController.js');
const userController = require('../controllers/userController.js');

router.get('/', twextController.getTwexta, (req, res) => {
  return res.status(200).json({ result: res.locals.twexta });
});

router.post(
  '/',
  userController.findUser,
  twextController.storeTwext,
  (req, res) => {
    return res.status(200).json({ result: res.locals.twextPostResult });
  }
);

module.exports = router;
