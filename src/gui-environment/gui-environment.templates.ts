import { IGUIEnvironmentTemplates } from './types.js';

/**
 * GUI Environment Templates Factory
 * Module in charge of generating the templates for the environment files.
 */
const GUIEnvironmentTemplatesFactory = (): IGUIEnvironmentTemplates => {
  /* **********************************************************************************************
   *                                      TEMPLATE BUILDERS                                       *
   ********************************************************************************************** */

  /**
   * Builds the template for the index.ts file that proxies all the environment contents.
   * @returns string
   */
  const buildIndex = (): string => {
    let template = 'export { default as IEnvironment } from \'./types\';\n';
    template += 'export { default as ENVIRONMENT } from \'./environment\';\n';

    // finally, return the finished template
    return template;
  };


  /**
   * Builds the template for the types.ts file that includes the types for the environment object.
   * @returns string
   */
  const buildTypes = (): string => {
    let template = '/**\n';
    template += ' * The following environment variables are used to modify the behavior of the app based on the kind\n';
    template += ' * of build.\n';
    template += ' */\n';
    template += 'interface IEnvironment {\n';
    template += '  // the kind of build that was performed\n';
    template += '  production: boolean,\n\n';
    template += '  // the current version of the GUI\n';
    template += '  version: string,\n';
    template += '}\n';
    template += '\n\n\n\n\n';
    template += '/**\n';
    template += ' * Module Exports\n';
    template += ' */\n';
    template += 'export default IEnvironment;\n';

    // finally, return the finished template
    return template;
  };

  /**
   * Builds the template for the environment file based on the given build mode.
   * @param production
   * @returns string
   */
  const buildEnvironment = (production: boolean) => {
    let template = 'import { IEnvironment } from \'./types\';\n';
    template += '\n';
    template += '/**\n';
    template += ' * Environment Variables\n';
    template += ' */\n';
    template += 'const ENVIRONMENT: IEnvironment = {\n';
    template += `  production: ${production},\n`;
    template += '  version: \'1.0.0\',\n';
    template += '}\n';
    template += '\n\n\n\n\n';
    template += '/**\n';
    template += ' * Module Exports\n';
    template += ' */\n';
    template += 'export default ENVIRONMENT;\n';

    // finally, return the finished template
    return template;
  };




  /* **********************************************************************************************
   *                                        MODULE BUILD                                          *
   ********************************************************************************************** */
  return Object.freeze({
    // template builders
    buildIndex,
    buildTypes,
    buildEnvironment,
  });
};





/**
 * Global Instance
 */
const GUIEnvironmentTemplates = GUIEnvironmentTemplatesFactory();





/**
 * Module Exports
 */
export default GUIEnvironmentTemplates;
