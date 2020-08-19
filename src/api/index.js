const express = require('express');
const { check, validationResult, } = require('express-validator');

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

  return res.json({
    message: 'POST req received - 👋🌎'
  });
});

module.exports = router;
