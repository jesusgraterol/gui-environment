#! /usr/bin/env node
import process from 'node:process';
import { GUIEnvironmentService } from './gui-environment/index.js';


/* ************************************************************************************************
 *                                           EXECUTION                                            *
 ************************************************************************************************ */
(() => {
  try {
    GUIEnvironmentService.executeAction(process.argv);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
