import _ from 'lodash';

const identSize = 4;
const offset = 2;
const replacer = ' ';

const entities = {
  added: '+ ',
  deleted: '- ',
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

    const lines = currentDiff.map(({ name, value, status }) => {
      let newLine;
      switch (status) {
        case 'added':
          newLine = `${currentIdent}${entities.added}${name}: ${build(value, depth + 1)}`;
          break;
        case 'deleted':
          newLine = `${currentIdent}${entities.deleted}${name}: ${build(value, depth + 1)}`;
          break;
        case 'unchanged':
          newLine = `${currentIdent}${entities.unchanged}${name}: ${build(value, depth + 1)}`;
          break;
        case 'modified':
          newLine = `${currentIdent}${entities.unchanged}${name}: ${iter(value, depth + 1)}`;
          break;
        default:
          throw new Error(`Status '${status}' is unknown`);
      }
      return newLine;
    });
    return ['{', ...lines, `${bracketIdent}}`].join('\n');
  };
  return iter(diff, 1);
};
