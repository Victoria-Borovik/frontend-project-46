import _ from 'lodash';

const identSize = 4;
const offset = 2;
const replacer = ' ';

const getIdent = (depth) => replacer.repeat(identSize * depth - offset);
const getBracketIndent = (depth) => replacer.repeat(identSize * depth - identSize);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${getIdent(depth)}  ${key}: ${stringify(val, depth + 1)}`)
    .join('\n');

  return `{\n${lines}\n${getBracketIndent(depth)}}`;
};

const format = (diff, depth = 1) => {
  const lines = diff.map((item) => {
    const { type, key } = item;
    switch (type) {
      case 'added': {
        const { value } = item;
        return `${getIdent(depth)}+ ${key}: ${stringify(value, depth + 1)}`;
      }
      case 'removed': {
        const { value } = item;
        return `${getIdent(depth)}- ${key}: ${stringify(value, depth + 1)}`;
      }
      case 'unchanged': {
        const { value } = item;
        return `${getIdent(depth)}  ${key}: ${stringify(value, depth + 1)}`;
      }
      case 'updated': {
        const { value1, value2 } = item;
        const line1 = `${getIdent(depth)}- ${key}: ${stringify(value1, depth + 1)}`;
        const line2 = `${getIdent(depth)}+ ${key}: ${stringify(value2, depth + 1)}`;
        return `${line1}\n${line2}`;
      }
      case 'nested': {
        const { children } = item;
        return `${getIdent(depth)}  ${key}: ${format(children, depth + 1)}`;
      }
      default: {
        return '';
      }
    }
  }).join('\n');
  return `{\n${lines}\n${getBracketIndent(depth)}}`;
};

export default format;
