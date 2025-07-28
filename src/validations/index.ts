import { encodeError } from 'error-message-utils';
import { isDirectory } from 'fs-utils-sync';
import { ERRORS } from '../shared/errors.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Verifies the provided srcPath is valid and it actually exists.
 * @param srcPath
 * @throws
 * - INVALID_PATH: if the provided srcPath is not a valid (pathlike) string
 * - NOT_A_DIRECTORY: if the srcPath does not exist or is not considered a dir by the OS
 */
const validateSourcePath = (srcPath: string | undefined): void => {
  if (typeof srcPath !== 'string' || !srcPath.length) {
    throw new Error(encodeError(`The src '${srcPath}' is invalid.`, ERRORS.INVALID_PATH));
  }
  if (!isDirectory(srcPath)) {
    throw new Error(
      encodeError(
        `The src directory '${srcPath}' does not exist or is not considered a directory by the OS.`,
        ERRORS.NOT_A_DIRECTORY,
      ),
    );
  }
};

/**
 * Checks if the environment can be initialized.
 * @param environmentDirPath
 * @throws
 * - ENVIRONMENT_ALREADY_INITIALIZED: if the environment's base directory exists
 */
const canEnvironmentBeInitialized = (environmentDirPath: string) => {
  if (isDirectory(environmentDirPath)) {
    throw new Error(
      encodeError(
        `The environment dir '${environmentDirPath} cannot be initialized because it already has been.'`,
        ERRORS.ENVIRONMENT_ALREADY_INITIALIZED,
      ),
    );
  }
};

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export { validateSourcePath, canEnvironmentBeInitialized };
