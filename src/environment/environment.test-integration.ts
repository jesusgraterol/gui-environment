import { describe, beforeAll, afterAll, beforeEach, afterEach, test, expect } from 'vitest';
import { createDirectory, deleteDirectory, readTextFile } from 'fs-utils-sync';
import { IEnvironmentName, IModuleArgs } from './types.js';
import { ERRORS } from './environment.errors.js';
import { ENVIRONMENT_NAMES, buildFilePath } from './environment.utils.js';
import { buildEnvironment, buildIndex, buildTypes } from './environment.templates.js';
import { executeAction } from './environment.js';

/* ************************************************************************************************
 *                                           CONSTANTS                                            *
 ************************************************************************************************ */

// the path to the test src directory
const SRC: string = 'src-test';



/* ************************************************************************************************
 *                                            HELPERS                                             *
 ************************************************************************************************ */

// builds the args object
const a = ({ srcPath, init, environment }: Partial<IModuleArgs>): IModuleArgs => (<IModuleArgs>{
  srcPath,
  init,
  environment,
});

//  reads a file by name
const rf = (fileName: string | IEnvironmentName) => readTextFile(buildFilePath(SRC, fileName));





/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('executeAction', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => {
    deleteDirectory(SRC);
  });

  describe('general', () => {
    test('throws if no srcPath is provided', () => {
      expect(() => executeAction(a({}))).toThrowError(ERRORS.INVALID_PATH);
    });

    test('throws if the srcPath does not exist', () => {
      expect(() => executeAction(a({ srcPath: SRC }))).toThrowError(ERRORS.NOT_A_DIRECTORY);
    });

    test('throws if no action is provided', () => {
      createDirectory(SRC);
      expect(() => executeAction(a({ srcPath: SRC }))).toThrowError(ERRORS.INVALID_CLI_ACTION);
    });
  });





  describe('init', () => {
    test('can fully initialize the environment', () => {
      createDirectory(SRC);
      executeAction(a({ srcPath: SRC, init: 'true' }));
      expect(rf('index')).toBe(buildIndex());
      expect(rf('types')).toBe(buildTypes());
      ENVIRONMENT_NAMES.forEach((n) => expect(rf(n)).toBe(buildEnvironment(n === 'production')));
      expect(rf('environment')).toBe(buildEnvironment(false));
    });

    test('cannot initialize the environment twice', () => {
      createDirectory(SRC);
      executeAction(a({ srcPath: SRC, init: 'true' }));
      expect(() => executeAction(a({ srcPath: SRC, init: 'true' }))).toThrowError(ERRORS.ENVIRONMENT_ALREADY_INITIALIZED);
    });
  });




  describe('install', () => {
    test.todo('throws if an invalid environment name is provided');

    test.todo('initializes the environment in case it hadn\'t been');

    test.todo('can install any environment');
  });
});
