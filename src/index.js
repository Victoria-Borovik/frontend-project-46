import { readFileSync } from 'node:fs';
import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import parse from './parser.js';
import format from './formatters/index.js';
import getDiffTree from './gettree.js';

const resolveFile = (file) => resolve(cwd(), file);

const readFile = (file) => readFileSync(resolveFile(file), 'utf8');

const readExtension = (file) => extname(resolveFile(file)).slice(1);

const parseFile = (file) => parse(readFile(file), readExtension(file));

export default (filepath1, filepath2, formatName = 'stylish') => {
  const filesContent = [filepath1, filepath2]
    .map(parseFile);
  const diffTree = getDiffTree(filesContent);
  return format(diffTree, formatName);
};
