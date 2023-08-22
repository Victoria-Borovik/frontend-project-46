import _ from 'lodash';
import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import parse from './parser.js';

const getDifference = ([obj1, obj2]) => {
  const sortedKeys = _.sortBy(_.uniq([..._.keys(obj1), ..._.keys(obj2)]));
  const result = sortedKeys.reduce((acc, key) => {
    const Obj1Line = `${key}: ${obj1[key]}\n`;
    const Obj2Line = `${key}: ${obj2[key]}\n`;
    let newLine = acc;
    if (!_.hasIn(obj2, key)) {
      newLine += `  - ${Obj1Line}`;
    } else if (!_.hasIn(obj1, key)) {
      newLine += `  + ${Obj2Line}`;
    } else if (obj1[key] !== obj2[key]) {
      newLine += `  - ${Obj1Line}  + ${Obj2Line}`;
    } else {
      newLine += `    ${Obj1Line}`;
    }
    return newLine;
  }, '');
  return `{\n${result}}`;
};

const func = (file1, file2) => {
  const filesContent = [file1, file2]
    .map((file) => resolve(`${cwd()}`, file))
    .map((filepath) => parse(readFileSync(filepath, 'utf8'), extname(filepath).slice(1)));
  return getDifference(filesContent);
};

export default func;
