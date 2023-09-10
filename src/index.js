import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import parse from './parser.js';
import getDiffTree from './gettree.js';
import format from './formatters/index.js';

const resolveFile = (filepath) => resolve(cwd(), filepath);

const readFile = (filepath) => readFileSync(resolveFile(filepath), 'utf8');

const readFormat = (filepath) => extname(resolveFile(filepath)).slice(1);

const parseFile = (filepath) => parse(readFile(filepath), readFormat(filepath));

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parseFile(filepath1);
  const data2 = parseFile(filepath2);
  const diffTree = getDiffTree(data1, data2);
  return format(diffTree, formatName);
};
