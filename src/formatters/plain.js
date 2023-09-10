import _ from 'lodash';

const normalizeKey = (key, parentKey) => ((parentKey === '') ? `${key}` : `${parentKey}.${key}`);

const normalizeValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

export default (diff) => {
  const iter = (currentDiff, parentKey = '') => {
    const lines = currentDiff.flatMap((item) => {
      const {
        type, key, value, value1, value2,
      } = item;
      const currentKey = normalizeKey(key, parentKey);
      switch (type) {
        case 'added': {
          const currentValue = normalizeValue(value);
          return `Property '${currentKey}' was added with value: ${currentValue}`;
        }
        case 'removed': {
          return `Property '${currentKey}' was removed`;
        }
        case 'updated': {
          return `Property '${currentKey}' was updated. From ${normalizeValue(value1)} to ${normalizeValue(value2)}`;
        }
        case 'nested': {
          return iter(value, currentKey);
        }
        default:
          return [];
      }
    });
    return lines.join('\n');
  };
  return iter(diff);
};
