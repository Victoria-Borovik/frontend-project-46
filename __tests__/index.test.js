import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const filenames = [
  ['file1.json', 'file2.json'],
  ['file1.yaml', 'file2.yaml'],
];

let expectedStylish;
let expectedPlain;
beforeAll(() => {
  expectedStylish = readFile('stylish.txt');
  expectedPlain = readFile('plain.txt');
});

test.each(filenames)('nested files -- stylish format', (file1, file2) => {
  const actual = gendiff(getFixturePath(file1), getFixturePath(file2), 'stylish');
  expect(actual).toEqual(expectedStylish);
});

test.each(filenames)('nested files -- plain format', (file1, file2) => {
  const actual = gendiff(getFixturePath(file1), getFixturePath(file2), 'plain');
  expect(actual).toEqual(expectedPlain);
});
