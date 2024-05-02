import { IGUIEnvironmentService } from './types.js';

/**
 * GUI Environment Service Factory
 * Service in charge of handling actions passed to the CLI.
 */
const GUIEnvironmentServiceFactory = (): IGUIEnvironmentService => {
  /* **********************************************************************************************
   *                                      ACTION EXECUTION                                        *
   ********************************************************************************************** */

  /**
   * Executes the action based on the provided args.
   * @param argv
   */
  const executeAction = (argv: string[]): void => {
    console.log(argv);
  };





  /* **********************************************************************************************
   *                                        MODULE BUILD                                          *
   ********************************************************************************************** */
  return Object.freeze({
    // action execution
    executeAction,
  });
};




/**
 * Global Instance
 */
const GUIEnvironmentService = GUIEnvironmentServiceFactory();




/**
 * Module Exports
 */
export default GUIEnvironmentService;
