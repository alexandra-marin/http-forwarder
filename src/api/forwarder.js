const axios = require('axios');
const flattenObject = require('../transformations/flattenObject');
const buildUrlParam = require('../transformations/buildUrlParam');
const capitalizeKeys = require('../transformations/capitalizeKeys');

const forwardToSpaceship = async (events) => {
  const success = [];
  let message = '';
  await Promise.all(
    events
      .map((evt) => flattenObject(evt))
      .map(async (payload) => {
        try {
          const response = await axios.post('https://sweeps.proxy.beeceptor.com/spaceship/r', payload);
          success.push(response.status);
          message = message.concat(`${response.data.status}\n`);
        } catch (error) {
          success.push(false);
          message = message.concat(`${error.message}\n`);
        }
      })
  );

  return {
    success: success.every((status) => status === 200),
    message
  };
};

const forwardToMonitor = async (events) => {
  const success = [];
  let message = '';
  await Promise.all(
    events
      .map((evt) => buildUrlParam(evt, 'timestamp'))
      .map(async ({ param, payload }) => {
        try {
          const response = await axios.put(`https://sweeps.proxy.beeceptor.com/m0nit0r.com/track_ship/${param}`, payload);
          success.push(response.status);
          message = message.concat(`${response.data.status}\n`);
        } catch (error) {
          success.push(false);
          message = message.concat(`${error.message}\n`);
        }
      })
  );

  return {
    success: success.every((status) => status === 200),
    message
  };
};

const forwardToAnalytics = async (events) => {
  const success = [];
  let message = '';
  await Promise.all(
    events
      .map((evt) => capitalizeKeys(evt, 't'))
      .map(async (payload) => {
        try {
          const response = await axios.post('https://sweeps.proxy.beeceptor.com/skyanalytics/get', payload);
          success.push(response.status);
          message = message.concat(`${response.data.status}\n`);
        } catch (error) {
          success.push(false);
          message = message.concat(`${error.message}\n`);
        }
      })
  );

  return {
    success: success.every((status) => status === 200),
    message
  };
};

const forward = async (events) => {
  const ship = await forwardToSpaceship(events);
  const monitor = await forwardToMonitor(events);
  const analytics = await forwardToAnalytics(events);

  const success = ship.success && monitor.success && analytics.success;
  const message = `${ship.message}\n${monitor.message}\n${analytics.message}`;

  return { success, message };
};

module.exports = forward;
