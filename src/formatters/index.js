import stylish from './stylish.js';
import plain from './plain.js';

export default (diff, formatName) => {
  if (formatName === 'stylish') {
    return stylish(diff);
  }
  if (formatName === 'plain') {
    return plain(diff);
  }
  throw new Error(`Format '${formatName}' is unknown`);
};
