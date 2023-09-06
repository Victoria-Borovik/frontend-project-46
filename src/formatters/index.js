import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

export default (diff, formatName) => {
  if (!Object.hasOwn(formatters, formatName)) {
    throw new Error(`Format '${formatName}' is unknown`);
  }
  return formatters[formatName](diff);
};
