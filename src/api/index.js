const express = require('express');
const { check, validationResult, } = require('express-validator');
const axios = require('axios');

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

  try {
    const response1 = await axios.post('https://sweeps.proxy.beeceptor.com/spaceship/r');
    console.log(response1.data);

    const response2 = await axios.put('https://sweeps.proxy.beeceptor.com/m0nit0r.com/track_ship/1595245629');
    console.log(response2.data);

    const response3 = await axios.post('https://sweeps.proxy.beeceptor.com/skyanalytics/get');
    console.log(response3.data);
  } catch (error) {
    console.log(error);
  }

  return res.json({
    message: 'POST req received - 👋🌎'
  });
});

module.exports = router;
