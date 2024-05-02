#! /usr/bin/env node
import process from 'node:process';
import Service from './GUIEnvironment.service.js';


/* ************************************************************************************************
 *                                           EXECUTION                                            *
 ************************************************************************************************ */
(() => {
  try {
    Service.executeAction(process.argv);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
