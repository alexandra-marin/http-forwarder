const capitalizeKeys = (obj, exception) => {
  const capitalized = {};

  Object
    .keys(obj)
    .forEach((key) => {
      let currentValue = obj[key];
      if (currentValue !== null && typeof currentValue === 'object' && !Array.isArray(currentValue)) {
        currentValue = capitalizeKeys(currentValue, exception);
      }

      if (key === exception) {
        capitalized[key] = currentValue;
      } else {
        const propValue = currentValue;
        const newPropName = key[0].toUpperCase() + key.slice(1);
        capitalized[newPropName] = propValue;
      }
    });
  return capitalized;
};

module.exports = capitalizeKeys;
