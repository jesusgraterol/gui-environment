/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */
type IErrorCode =
  | 'INVALID_PATH'
  | 'NOT_A_DIRECTORY'
  | 'INVALID_ENVIRONMENT_NAME'
  | 'ENVIRONMENT_ALREADY_INITIALIZED'
  | 'INVALID_PACKAGE_FILE';
const ERRORS: { [key in IErrorCode]: IErrorCode } = {
  INVALID_PATH: 'INVALID_PATH',
  NOT_A_DIRECTORY: 'NOT_A_DIRECTORY',
  INVALID_ENVIRONMENT_NAME: 'INVALID_ENVIRONMENT_NAME',
  ENVIRONMENT_ALREADY_INITIALIZED: 'ENVIRONMENT_ALREADY_INITIALIZED',
  INVALID_PACKAGE_FILE: 'INVALID_PACKAGE_FILE',
};

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export { ERRORS };
