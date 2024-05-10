import { IParsedArgs } from 'argv-utils';
import { encodeError } from 'error-message-utils';
import { IEnvironmentName } from './types.js';
import { ERRORS } from './environment.errors.js';
import { validateSourcePath } from './environment.validations.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

const __init = (srcPath: string): void => {

};

const __install = (srcPath: string, environment: IEnvironmentName): void => {

};

/**
 * Executes an action based on the passed arguments.
 * @param args
 * @throws
 * - INVALID_CLI_ACTION: if an invalid action or no action at all is provided.
 * - INVALID_PATH: if the provided srcPath has an invalid format
 * - NOT_A_DIRECTORY: if the srcPath is not a valid directory
 * - INVALID_ENVIRONMENT_NAME: if the provided environment name is not supported by the package
 */
const executeAction = ({ srcPath = 'src', init, environment }: IParsedArgs): void => {
  // firstly, validate the provided source path
  validateSourcePath(srcPath);

  // execute the action accordingly
  if (init) {
    __init(srcPath);
  } else if (environment) {
    __install(srcPath, <IEnvironmentName>environment);
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
