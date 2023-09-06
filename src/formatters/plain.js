import _ from 'lodash';

const normalizeName = (name, parentName) => ((parentName === '') ? `${name}` : `${parentName}.${name}`);

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
  const iter = (currentDiff, parentName = '') => {
    const lines = currentDiff.flatMap((item) => {
      const {
        status, name, value, ...rest
      } = item;
      const currentName = normalizeName(name, parentName);
      switch (status) {
        case 'added': {
          const currentValue = normalizeValue(value);
          return `Property '${currentName}' was added with value: ${currentValue}`;
        }
        case 'removed': {
          return `Property '${currentName}' was removed`;
        }
        case 'updated': {
          const { valueBefore, valueAfter } = rest;
          return `Property '${currentName}' was updated. From ${normalizeValue(valueBefore)} to ${normalizeValue(valueAfter)}`;
        }
        case 'modified': {
          return iter(value, currentName);
        }
        default:
          return [];
      }
    });
    return lines.join('\n');
  };
  return iter(diff);
};
