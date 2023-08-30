import _ from 'lodash';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import parse from './parser.js';
import format from './formatters/stylish.js';

const getDifference = ([obj1, obj2]) => {
  const sortedKeys = _.sortBy(_.uniq([..._.keys(obj1), ..._.keys(obj2)]));
  const result = sortedKeys.reduce((acc, key) => {
    let newAcc;
    if (!_.hasIn(obj2, key)) {
      newAcc = [...acc, { name: key, value: obj1[key], status: 'deleted' }];
    } else if (!_.hasIn(obj1, key)) {
      newAcc = [...acc, { name: key, value: obj2[key], status: 'added' }];
    } else if (obj1[key] === obj2[key]) {
      newAcc = [...acc, { name: key, value: obj2[key], status: 'unchanged' }];
    } else if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const diffValue = getDifference([obj1[key], obj2[key]]);
      newAcc = [...acc, { name: key, value: diffValue, status: 'modified' }];
    } else {
      newAcc = [...acc,
        { name: key, value: obj1[key], status: 'deleted' },
        { name: key, value: obj2[key], status: 'added' },
      ];
    }
    return newAcc;
  }, []);

  return result;
};

const func = (file1, file2) => {
  const filesContent = [file1, file2]
    .map((file) => resolve(`${cwd()}`, file))
    .map((filepath) => parse(readFileSync(filepath, 'utf8'), extname(filepath).slice(1)));
  return format(getDifference(filesContent));
};

export default func;
