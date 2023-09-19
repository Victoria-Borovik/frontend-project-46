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

const format = (diff, parentKey = '') => {
  const lines = diff.flatMap((item) => {
    const { type, key } = item;
    const currentKey = normalizeKey(key, parentKey);
    switch (type) {
      case 'added': {
        const { value } = item;
        const currentValue = normalizeValue(value);
        return `Property '${currentKey}' was added with value: ${currentValue}`;
      }
      case 'removed': {
        return `Property '${currentKey}' was removed`;
      }
      case 'updated': {
        const { value1, value2 } = item;
        return `Property '${currentKey}' was updated. From ${normalizeValue(value1)} to ${normalizeValue(value2)}`;
      }
      case 'nested': {
        const { children } = item;
        return format(children, currentKey);
      }
      default:
        return [];
    }
  });
  return lines.join('\n');
};

export default format;
