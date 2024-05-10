import { IBaseParsedArgs } from 'argv-utils';

/* ************************************************************************************************
 *                                              TYPES                                             *
 ************************************************************************************************ */

/**
 * Environment Name
 * The name of the environments that can be installed by the gui-environment binary.
 */
type IEnvironmentName = 'development' | 'staging' | 'production';


/**
 * Module Args
 * The args that can be passed to the gui-environment CLI
 */
interface IModuleArgs extends IBaseParsedArgs {
  srcPath?: string,
  init?: 'true',
  environment?: IEnvironmentName,
}




/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type {
  IEnvironmentName,
  IModuleArgs,
};
