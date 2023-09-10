import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

export default (data, format) => {
  if (!Object.hasOwn(parsers, format)) {
    throw new Error(`Error: unsupported format ${format}`);
  }
  return parsers[format](data);
};
