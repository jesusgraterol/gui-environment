

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Builds the template for the types.ts file that handles the initialization of the environment's
 * interface
 * @returns string
 */
const buildTypes = (): string => {
  let template = '\n\n';
  template += '/* ************************************************************************************************\n';
  template += ' *                                             TYPES                                              *\n';
  template += ' ************************************************************************************************ */\n\n';
  template += '/**\n';
  template += ' * Environment Variables\n';
  template += ' * The following environment variables are used to modify the behavior of the app based on the\n';
  template += ' * deployment environment of the build.\n';
  template += ' */\n';
  template += 'interface IEnvironment {\n';
  template += '  // the kind of build that was performed\n';
  template += '  production: boolean,\n\n';
  template += '  // the current version of the GUI\n';
  template += '  version: string,\n';
  template += '}\n';
  template += '\n\n\n\n\n';
  template += '/* ************************************************************************************************\n';
  template += ' *                                         MODULE EXPORTS                                         *\n';
  template += ' ************************************************************************************************ */\n';
  template += 'export type {\n';
  template += '  IEnvironment,\n';
  template += '};\n';

  // finally, return the finished template
  return template;
};

/**
 * Builds the environment file based on the deployment target.
 * @param production
 * @returns string
 */
const buildEnvironment = (production: boolean): string => {
  let template = 'import { IEnvironment } from \'./types\';\n\n';
  template += '/* ************************************************************************************************\n';
  template += ' *                                      ENVIRONMENT VARIABLES                                     *\n';
  template += ' ************************************************************************************************ */\n';
  template += 'const ENVIRONMENT: IEnvironment = {\n';
  template += `  production: ${production},\n`;
  template += '  version: \'1.0.0\',\n';
  template += '};\n';
  template += '\n\n\n\n\n';
  template += '/* ************************************************************************************************\n';
  template += ' *                                         MODULE EXPORTS                                         *\n';
  template += ' ************************************************************************************************ */\n';
  template += 'export {\n';
  template += '  ENVIRONMENT,\n';
  template += '};\n';

  // finally, return the finished template
  return template;
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  buildTypes,
  buildEnvironment,
};
