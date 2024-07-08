import { normalize } from 'node:path';
import { encodeError } from 'error-message-utils';
import { readJSONFile } from 'fs-utils-sync';
import {
  IEnvironmentName,
  ENVIRONMENT_DIR_NAME,
  ENVIRONMENT_FILE_EXT,
  ENVIRONMENT_BASE_FILE_NAME,
  ENVIRONMENT_NAMES,
  ERRORS,
} from '../shared/index.js';

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
const __buildFileName = (fileName: string): string => `${fileName}${ENVIRONMENT_FILE_EXT}`;

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

/**
 * Determines the environment name based on the provided args.
 * @param development?
 * @param staging?
 * @param production?
 * @returns IEnvironmentName
 * @throws
 * - INVALID_ENVIRONMENT_NAME: if no environment name can be extracted
 */
const getEnvironmentName = (
  development?: 'true',
  staging?: 'true',
  production?: 'true',
): IEnvironmentName => {
  if (development) {
    return 'development';
  }
  if (staging) {
    return 'staging';
  }
  if (production) {
    return 'production';
  }
  throw new Error(encodeError('The provided environment name is invalid. Ensure to invoke the CLI with a valid environment name: gui-environment (--development | --staging | --production)', ERRORS.INVALID_ENVIRONMENT_NAME));
};

/**
 * Builds the content that will be added to the .gitignore file. Ensure to enable append if the file
 * exists.
 * @param src
 * @param toBeAppended?
 * @returns string
 */
const buildGITIgnoreContent = (src: string, toBeAppended?: boolean): string => `${toBeAppended ? '\n' : ''}# gui-environment output\n${buildFilePath(src, 'environment')}\n`;

/**
 * Reads the GUI's version from the package.json file and returns it.
 * @returns string
 */
const getGUIVersion = (): string => {
  const { version } = readJSONFile('package.json');
  if (typeof version !== 'string' || !version.length) {
    throw new Error(encodeError(`The GUI's version could not be extracted from the package.json file. Received: ${version}`, ERRORS.INVALID_PACKAGE_FILE));
  }
  return version;
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // implementation
  buildEnvironmentPath,
  buildFilePath,
  getEnvironmentName,
  buildGITIgnoreContent,
  getGUIVersion,
};
