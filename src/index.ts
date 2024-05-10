#! /usr/bin/env node
import process from 'node:process';
import { parseArgs } from 'argv-utils';
import { executeAction } from './environment/index.js';

(() => {
  try {
    executeAction(parseArgs(process.argv));
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
