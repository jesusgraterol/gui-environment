/**
 * Service
 */
interface IGUIEnvironmentService {
  executeAction(argv: string[]): void,
}




/**
 * Utils
 */
interface IGUIEnvironmentUtils {

}




/**
 * Templates
 */
interface IGUIEnvironmentTemplates {
  // template builders
  buildIndex(): string,
  buildTypes(): string,
  buildEnvironment(production: boolean): string,
}





/**
 * Module Exports
 */
export type {
  IGUIEnvironmentService,
  IGUIEnvironmentUtils,
  IGUIEnvironmentTemplates,
};
