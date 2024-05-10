import { describe, beforeAll, afterAll, beforeEach, afterEach, test, expect } from 'vitest';
import { createDirectory, deleteDirectory, readTextFile } from 'fs-utils-sync';
import { IModuleArgs } from './types.js';
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

const __a = ({ srcPath, init, environment }: Partial<IModuleArgs>): IModuleArgs => (<IModuleArgs>{
  srcPath,
  init,
  environment,
});


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
      expect(() => executeAction(__a({}))).toThrowError(ERRORS.INVALID_PATH);
    });

    test('throws if the srcPath does not exist', () => {
      expect(() => executeAction(__a({ srcPath: SRC }))).toThrowError(ERRORS.NOT_A_DIRECTORY);
    });

    test('throws if no action is provided', () => {
      createDirectory(SRC);
      expect(() => executeAction(__a({ srcPath: SRC }))).toThrowError(ERRORS.INVALID_CLI_ACTION);
    });
  });





  describe('init', () => {
    test('can fully initialize the environment', () => {
      createDirectory(SRC);
      executeAction(__a({ srcPath: SRC, init: 'true' }));
      expect(readTextFile(buildFilePath(SRC, 'index'))).toBe(buildIndex());
      expect(readTextFile(buildFilePath(SRC, 'types'))).toBe(buildTypes());
      ENVIRONMENT_NAMES.forEach(
        (name) => expect(
          readTextFile(buildFilePath(SRC, name)),
        ).toBe(buildEnvironment(name === 'production')),
      );
      expect(readTextFile(buildFilePath(SRC, 'environment'))).toBe(buildEnvironment(false));
    });

    test('cannot initialize the environment twice', () => {
      createDirectory(SRC);
      executeAction(__a({ srcPath: SRC, init: 'true' }));
      expect(() => executeAction(__a({ srcPath: SRC, init: 'true' }))).toThrowError(ERRORS.ENVIRONMENT_ALREADY_INITIALIZED);
    });
  });
});
