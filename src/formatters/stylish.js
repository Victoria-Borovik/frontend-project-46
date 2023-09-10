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
        type, key, value, value1, value2,
      } = item;
      switch (type) {
        case 'nested': {
          return `${currentIdent}${entities.unchanged}${key}: ${iter(value, depth + 1)}`;
        }
        case 'updated': {
          return `${currentIdent}${entities.removed}${key}: ${convertToStr(value1, depth + 1)}\n${currentIdent}${entities.added}${key}: ${convertToStr(value2, depth + 1)}`;
        }
        default: {
          return `${currentIdent}${entities[type]}${key}: ${convertToStr(value, depth + 1)}`;
        }
      }
    });
    return ['{', ...lines, `${bracketIdent}}`].join('\n');
  };
  return iter(diff, 1);
};
