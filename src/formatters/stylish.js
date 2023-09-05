import _ from 'lodash';

const identSize = 4;
const offset = 2;
const replacer = ' ';

const entities = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
};

const build = (value, depth) => {
  const iter = (currentValue, currentDepth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const currentIdentSize = identSize * currentDepth;
    const bracketIdentSize = identSize * currentDepth - identSize;
    const currentIdent = replacer.repeat(currentIdentSize);
    const bracketIdent = replacer.repeat(bracketIdentSize);

    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIdent}${key}: ${iter(val, currentDepth + 1)}`);

    return ['{', ...lines, `${bracketIdent}}`].join('\n');
  };

  return iter(value, depth);
};

export default (diff) => {
  const iter = (currentDiff, depth) => {
    const currentIdentSize = identSize * depth - offset;
    const bracketIdentSize = identSize * depth - identSize;
    const currentIdent = replacer.repeat(currentIdentSize);
    const bracketIdent = replacer.repeat(bracketIdentSize);

    const lines = currentDiff.map((node) => {
      const { status, ...rest } = node;
      if (status === 'updated') {
        const { name, valueBefore, valueAfter } = rest;
        return `${currentIdent}${entities.removed}${name}: ${build(valueBefore, depth + 1)}\n${currentIdent}${entities.added}${name}: ${build(valueAfter, depth + 1)}`;
      }
      const { name, value } = rest;
      if (status === 'modified') {
        return `${currentIdent}${entities.unchanged}${name}: ${iter(value, depth + 1)}`;
      }
      return `${currentIdent}${entities[status]}${name}: ${build(value, depth + 1)}`;
    });
    return ['{', ...lines, `${bracketIdent}}`].join('\n');
  };
  return iter(diff, 1);
};
