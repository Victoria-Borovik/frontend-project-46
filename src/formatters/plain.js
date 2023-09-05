import _ from 'lodash';

const prepareName = (name, parentName) => ((parentName === '') ? `${name}` : `${parentName}.${name}`);

const prepareValue = (value) => {
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
    const lines = currentDiff.flatMap((node) => {
      const {
        status, name, value, ...rest
      } = node;
      const currentName = prepareName(name, parentName);
      if (status === 'added') {
        const currentValue = prepareValue(value);
        return `Property '${currentName}' was added with value: ${currentValue}`;
      }
      if (status === 'removed') {
        return `Property '${currentName}' was removed`;
      }
      if (status === 'updated') {
        const { valueBefore, valueAfter } = rest;
        const currentValueBefore = prepareValue(valueBefore);
        const currentValueAfter = prepareValue(valueAfter);
        return `Property '${currentName}' was updated. From ${currentValueBefore} to ${currentValueAfter}`;
      }
      if (status === 'unchanged') {
        return '';
      }
      return iter(value, currentName);
    });
    return lines.filter((line) => line.length !== 0).join('\n');
  };
  return iter(diff);
};
