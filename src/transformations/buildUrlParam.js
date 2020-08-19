const buildUrlParam = (obj, propName) => {
  const param = obj[propName];
  delete obj[propName];

  return { param, payload: obj };
};

module.exports = buildUrlParam;
