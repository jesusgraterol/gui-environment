import { normalize } from 'node:path';
import { IEnvironmentName } from './types.js';

/* ************************************************************************************************
 *                                           CONSTANTS                                            *
 ************************************************************************************************ */

// environment directory name
const ENVIRONMENT_DIR_NAME: string = 'environment';

// environment base file name
const ENVIRONMENT_BASE_FILE_NAME: string = 'environment';

// environment file extension name
const ENVIRONMENT_FILE_EXT: string = '.ts';

// the list of supported environment names
const ENVIRONMENT_NAMES: IEnvironmentName[] = ['development', 'staging', 'production'];





/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Builds the path to the environment directory. If a fileName is passed it is included.
 * @returns string
 */
const buildEnvironmentPath = (
  srcPath: string,
  fileName?: string,
): string => (typeof fileName === 'string'
  ? normalize(`${srcPath}/${ENVIRONMENT_DIR_NAME}/${fileName}`)
  : normalize(`${srcPath}/${ENVIRONMENT_DIR_NAME}`));

/**
 * Puts together the name for a file including its extension.
 * @param fileName
 * @returns string
 */
const __buildFileName = (fileName: string): string => `${fileName}.${ENVIRONMENT_FILE_EXT}`;

/**
 * Builds the path for a file. If the fileName is an environment name, it puts together the
 * full name.
 * @param srcPath
 * @param fileName
 * @returns string
 */
const buildFilePath = (srcPath: string, fileName: string | IEnvironmentName): string => (
  ENVIRONMENT_NAMES.includes(fileName as IEnvironmentName)
    ? buildEnvironmentPath(srcPath, __buildFileName(`${ENVIRONMENT_BASE_FILE_NAME}.${fileName}`))
    : buildEnvironmentPath(srcPath, __buildFileName(fileName))
);





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // constants
  ENVIRONMENT_DIR_NAME,
  ENVIRONMENT_NAMES,
  ENVIRONMENT_BASE_FILE_NAME,
  ENVIRONMENT_FILE_EXT,

  // implementation
  buildEnvironmentPath,
  buildFilePath,
};
