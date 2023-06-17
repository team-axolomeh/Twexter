const router = require('express').Router();

const twextController = require('../controllers/twextController.js');

router.get('/', twextController.getTwexta, (req, res) => {
  return res.status(200).json({ result: res.locals.twexta });
});

module.exports = router;
