import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

export default (data, extension) => {
  if (!Object.hasOwn(parsers, extension)) {
    throw new Error(`Error: unsupported format ${extension}`);
  }
  return parsers[extension](data);
};
