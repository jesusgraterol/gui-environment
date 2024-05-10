import { encodeError } from 'error-message-utils';
import { copyFile, isDirectory, writeTextFile } from 'fs-utils-sync';
import { IEnvironmentName, IModuleArgs } from './types.js';
import { ERRORS } from './environment.errors.js';
import {
  ENVIRONMENT_NAMES,
  buildEnvironmentPath,
  buildFilePath,
} from './environment.utils.js';
import { buildIndex, buildTypes, buildEnvironment } from './environment.templates.js';
import {
  validateSourcePath,
  canEnvironmentBeInitialized,
  validateEnvironmentName,
} from './environment.validations.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Installs an environment by name.
 * @param srcPath
 * @param name
 */
const __installEnvironment = (srcPath: string, name: IEnvironmentName): void => copyFile(
  buildFilePath(srcPath, name),
  buildFilePath(srcPath, 'environment'),
);

/**
 * Initializes the environment base directory as well as all the required files. Once done, it
 * installs the development environment.
 * @param srcPath
 */
const __init = (srcPath: string): void => {
  // ensure it can be initialized
  canEnvironmentBeInitialized(buildEnvironmentPath(srcPath));

  // create all the base files and once done, install the development environment
  writeTextFile(buildFilePath(srcPath, 'index'), buildIndex());
  writeTextFile(buildFilePath(srcPath, 'types'), buildTypes());
  ENVIRONMENT_NAMES.forEach((name) => (
    writeTextFile(buildFilePath(srcPath, name), buildEnvironment(name === 'production'))
  ));
  __installEnvironment(srcPath, 'development');
};

/**
 * Installs an environment by name - overriding whatever environment was active. Note that if
 * the environment has not yet been initialized, it does so prior to the installation.
 * @param srcPath
 * @param environment
 * @throws
 * - INVALID_ENVIRONMENT_NAME: if the provided environment name is not supported
 */
const __install = (srcPath: string, environment: IEnvironmentName): void => {
  validateEnvironmentName(environment);
  if (!isDirectory(buildEnvironmentPath(srcPath))) {
    __init(srcPath);
  }
  __installEnvironment(srcPath, environment);
};





/* ************************************************************************************************
 *                                            EXECUTION                                           *
 ************************************************************************************************ */

/**
 * Executes an action based on the passed arguments.
 * @param args
 * @throws
 * - INVALID_CLI_ACTION: if an invalid action or no action at all is provided.
 * - INVALID_PATH: if the provided srcPath has an invalid format
 * - NOT_A_DIRECTORY: if the srcPath is not a valid directory
 * - INVALID_ENVIRONMENT_NAME: if the provided environment name is not supported by the package
 */
const executeAction = ({ srcPath, init, environment }: IModuleArgs): void => {
  // firstly, validate the provided source path
  validateSourcePath(srcPath);

  // execute the action accordingly
  if (init) {
    __init(<string>srcPath);
  } else if (environment) {
    __install(<string>srcPath, environment);
  } else {
    throw new Error(encodeError('The CLI must be invoked with a valid action such as: gui-environment --init or gui-environment --environment="development"', ERRORS.INVALID_CLI_ACTION));
  }
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  executeAction,
};
