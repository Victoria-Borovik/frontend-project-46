import _ from 'lodash';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import parse from './parser.js';
import format from './formatters/index.js';

const getDiffTree = ([obj1, obj2]) => {
  const sortedKeys = _.sortBy(_.uniq([..._.keys(obj1), ..._.keys(obj2)]));
  const result = sortedKeys.reduce((acc, key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const diffValue = getDiffTree([obj1[key], obj2[key]]);
      return [...acc, { status: 'modified', name: key, value: diffValue }];
    }
    if (!_.hasIn(obj1, key)) {
      return [...acc, { status: 'added', name: key, value: obj2[key] }];
    }
    if (!_.hasIn(obj2, key)) {
      return [...acc, { status: 'removed', name: key, value: obj1[key] }];
    }
    if (obj1[key] !== obj2[key]) {
      return [...acc, {
        status: 'updated', name: key, valueBefore: obj1[key], valueAfter: obj2[key],
      }];
    }
    return [...acc, { status: 'unchanged', name: key, value: obj2[key] }];
  }, []);

  return result;
};

const func = (filepath1, filepath2, formatName = 'stylish') => {
  const filesContent = [filepath1, filepath2]
    .map((file) => resolve(`${cwd()}`, file))
    .map((filepath) => parse(readFileSync(filepath, 'utf8'), extname(filepath).slice(1)));
  const diffTree = getDiffTree(filesContent);
  return format(diffTree, formatName);
};

export default func;
