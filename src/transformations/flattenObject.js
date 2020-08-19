const flattenObject = (obj, nestedProp) => {
  const flattened = {};

  Object
    .keys(obj)
    .forEach((key) => {
      const currentPropName = nestedProp ? `${nestedProp}.${key}` : key;
      const currentValue = obj[key];

      if (typeof currentValue === 'object' && currentValue !== null) {
        if (Array.isArray(currentValue)) {
          flattened[currentPropName] = currentValue.join(',');
        } else {
          Object.assign(flattened, flattenObject(currentValue, currentPropName));
        }
      } else {
        flattened[currentPropName] = currentValue;
      }
    });
  return flattened;
};

module.exports = flattenObject;
