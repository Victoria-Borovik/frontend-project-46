#!/usr/bin/env node

import { program } from 'commander';
import func from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    console.log(func(filepath1, filepath2));
  });
program.parse();
