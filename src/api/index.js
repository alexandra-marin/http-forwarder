const express = require('express');
const { check, validationResult, } = require('express-validator');
const forward = require('./forwarder');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎'
  });
});

router.post('/', async (req, res) => {
  await check('events', 'Events cannot be blank').not().isEmpty().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }

  const { success, message } = await forward(req.body.events);

  if (success) {
    return res
      .status(200)
      .json({ message });
    // eslint-disable-next-line no-else-return
  } else {
    return res
      .json({ message });
  }
});

module.exports = router;
