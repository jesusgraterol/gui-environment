

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Errors
 * The list of errors that can occur in the environment module.
 */
enum ERRORS {
  INVALID_CLI_ACTION = 'INVALID_CLI_ACTION',
  INVALID_PATH = 'INVALID_PATH',
  NOT_A_DIRECTORY = 'NOT_A_DIRECTORY',
  INVALID_ENVIRONMENT_NAME = 'INVALID_ENVIRONMENT_NAME',
  ENVIRONMENT_ALREADY_INITIALIZED = 'ENVIRONMENT_ALREADY_INITIALIZED',
}





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  ERRORS,
};
