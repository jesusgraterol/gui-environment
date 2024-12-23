import {
  isDirectory,
  isFile,
  readTextFile,
  writeTextFile,
} from 'fs-utils-sync';
import { IEnvironmentName, IModuleArgs } from '../shared/types.js';
import { ENVIRONMENT_NAMES, GIT_IGNORE_PATH } from '../shared/constants.js';
import {
  buildEnvironmentPath,
  buildFilePath,
  getEnvironmentName,
  buildGITIgnoreContent,
  getGUIVersion,
} from '../utils/index.js';
import { buildTypes, buildEnvironment } from '../templates/index.js';
import { validateSourcePath, canEnvironmentBeInitialized } from '../validations/index.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Installs an environment by name.
 * @param srcPath
 * @param name
 */
const __installEnvironment = (srcPath: string, name: IEnvironmentName): void => {
  // init the paths
  const src = buildFilePath(srcPath, name);
  const dest = buildFilePath(srcPath, 'environment');

  // read the source file and set the GUI's Version based on the package.json file
  const version = getGUIVersion();
  const srcFile = readTextFile(src).replace(
    'version: \'(package.json).version\'',
    `version: '${version}'`,
  );

  // finally, save the file
  writeTextFile(dest, srcFile);
};

/**
 * Adds the automatically generated environment file into the .gitignore file. If the file already
 * exists, the content will be appended in case it hasn't already been.
 * @param srcPath
 */
const __addEnvironmentToGITIgnore = (srcPath: string): void => {
  if (isFile(GIT_IGNORE_PATH)) {
    let originalContent = readTextFile(GIT_IGNORE_PATH);
    const outputContent = buildGITIgnoreContent(srcPath, true);
    if (!originalContent.includes(outputContent)) {
      originalContent += outputContent;
      writeTextFile(GIT_IGNORE_PATH, originalContent);
    }
  } else {
    writeTextFile(GIT_IGNORE_PATH, buildGITIgnoreContent(srcPath));
  }
};

/**
 * Initializes the environment base directory as well as all the required files. Once done, it
 * installs the development environment.
 * @param srcPath
 */
const __init = (srcPath: string): void => {
  // ensure it can be initialized
  canEnvironmentBeInitialized(buildEnvironmentPath(srcPath));

  // create all the base files and once done, install the development environment
  writeTextFile(buildFilePath(srcPath, 'types'), buildTypes());
  ENVIRONMENT_NAMES.forEach((name) => (
    writeTextFile(buildFilePath(srcPath, name), buildEnvironment(name === 'production'))
  ));
  __installEnvironment(srcPath, 'development');

  // add the automatically generated environment file to .gitignore
  __addEnvironmentToGITIgnore(srcPath);
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
 * - INVALID_PATH: if the provided src has an invalid format
 * - NOT_A_DIRECTORY: if the src is not a valid directory
 * - INVALID_ENVIRONMENT_NAME: if the provided environment name is not supported by the package
 */
const executeAction = ({
  src = 'src',
  init,
  development,
  staging,
  production,
}: IModuleArgs): void => {
  // firstly, validate the provided source path
  validateSourcePath(src);

  // execute the action accordingly
  if (init) {
    __init(src);
  } else {
    __install(src, getEnvironmentName(development, staging, production));
  }
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  executeAction,
};
