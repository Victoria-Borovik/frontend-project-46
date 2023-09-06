import _ from 'lodash';

const identSize = 4;
const offset = 2;
const replacer = ' ';

const entities = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
};

const convertToStr = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const currentIdent = replacer.repeat(identSize * depth);
  const bracketIdent = replacer.repeat(identSize * depth - identSize);

  const lines = Object
    .entries(value)
    .map(([key, val]) => `${currentIdent}${key}: ${convertToStr(val, depth + 1)}`);

  return ['{', ...lines, `${bracketIdent}}`].join('\n');
};

export default (diff) => {
  const iter = (currentDiff, depth) => {
    const currentIdent = replacer.repeat(identSize * depth - offset);
    const bracketIdent = replacer.repeat(identSize * depth - identSize);

    const lines = currentDiff.map((item) => {
      const {
        status, name, value, valueBefore, valueAfter,
      } = item;
      switch (status) {
        case 'modified': {
          return `${currentIdent}${entities.unchanged}${name}: ${iter(value, depth + 1)}`;
        }
        case 'updated': {
          return `${currentIdent}${entities.removed}${name}: ${convertToStr(valueBefore, depth + 1)}\n${currentIdent}${entities.added}${name}: ${convertToStr(valueAfter, depth + 1)}`;
        }
        default: {
          return `${currentIdent}${entities[status]}${name}: ${convertToStr(value, depth + 1)}`;
        }
      }
    });
    return ['{', ...lines, `${bracketIdent}}`].join('\n');
  };
  return iter(diff, 1);
};
