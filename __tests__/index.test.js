import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('plain json', () => {
  const expected = readFile('result.txt');
  expect(gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(expected);
});

test('plain yaml', () => {
  const expected = readFile('result.txt');
  expect(gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toEqual(expected);
});
