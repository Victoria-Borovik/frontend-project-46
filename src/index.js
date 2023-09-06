import _ from 'lodash';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import parse from './parser.js';
import format from './formatters/index.js';

const getUniteKeys = (obj1, obj2) => {
  const uniqKeys = _.uniq([..._.keys(obj1), ..._.keys(obj2)]);
  return _.sortBy(uniqKeys);
};

const getDiffTree = ([obj1, obj2]) => {
  const keys = getUniteKeys(obj1, obj2);
  const tree = keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (_.isObject(value1) && _.isObject(value2)) {
      return { status: 'modified', name: key, value: getDiffTree([value1, value2]) };
    }
    if (!_.hasIn(obj1, key)) {
      return { status: 'added', name: key, value: value2 };
    }
    if (!_.hasIn(obj2, key)) {
      return { status: 'removed', name: key, value: value1 };
    }
    if (value1 !== value2) {
      return {
        status: 'updated', name: key, valueBefore: value1, valueAfter: value2,
      };
    }
    return { status: 'unchanged', name: key, value: value2 };
  });

  return tree;
};

export default (filepath1, filepath2, formatName = 'stylish') => {
  const filesContent = [filepath1, filepath2]
    .map((file) => resolve(`${cwd()}`, file))
    .map((filepath) => parse(readFileSync(filepath, 'utf8'), extname(filepath).slice(1)));
  const diffTree = getDiffTree(filesContent);
  return format(diffTree, formatName);
};
