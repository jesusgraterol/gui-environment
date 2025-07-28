import { IEnvironmentName } from './types.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

// environment directory name
const ENVIRONMENT_DIR_NAME: string = 'environment';

// environment base file name
const ENVIRONMENT_BASE_FILE_NAME: string = 'environment';

// environment file extension name
const ENVIRONMENT_FILE_EXT: string = '.ts';

// the list of supported environment names
const ENVIRONMENT_NAMES: IEnvironmentName[] = ['development', 'staging', 'production'];

// the path to the git ignore file
const GIT_IGNORE_PATH: string = '.gitignore';

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  ENVIRONMENT_DIR_NAME,
  ENVIRONMENT_NAMES,
  ENVIRONMENT_BASE_FILE_NAME,
  ENVIRONMENT_FILE_EXT,
  GIT_IGNORE_PATH,
};
