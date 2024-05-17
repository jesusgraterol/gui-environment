import { describe, beforeAll, afterAll, beforeEach, afterEach, test, expect } from 'vitest';
import { createDirectory, deleteDirectory, readTextFile } from 'fs-utils-sync';
import { IEnvironmentName, IModuleArgs, ERRORS } from '../shared/index.js';
import { ENVIRONMENT_NAMES, buildFilePath } from '../utils/index.js';
import { buildEnvironment, buildIndex, buildTypes } from '../templates/index.js';
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
const a = ({
  src,
  init,
  development,
  staging,
  production,
}: Partial<IModuleArgs>): IModuleArgs => (<IModuleArgs>{
  src,
  init,
  development,
  staging,
  production,
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
    test('throws if the src does not exist', () => {
      expect(() => executeAction(a({ src: SRC }))).toThrowError(ERRORS.NOT_A_DIRECTORY);
    });

    test('throws if no action is provided', () => {
      createDirectory(SRC);
      expect(() => executeAction(a({ src: SRC }))).toThrowError(ERRORS.INVALID_ENVIRONMENT_NAME);
    });
  });





  describe('init', () => {
    test('can fully initialize the environment', () => {
      createDirectory(SRC);
      executeAction(a({ src: SRC, init: 'true' }));
      expect(rf('index')).toBe(buildIndex());
      expect(rf('types')).toBe(buildTypes());
      ENVIRONMENT_NAMES.forEach((n) => expect(rf(n)).toBe(buildEnvironment(n === 'production')));
      expect(rf('environment')).toBe(buildEnvironment(false));
    });

    test('cannot initialize the environment twice', () => {
      createDirectory(SRC);
      executeAction(a({ src: SRC, init: 'true' }));
      expect(() => executeAction(a({ src: SRC, init: 'true' }))).toThrowError(ERRORS.ENVIRONMENT_ALREADY_INITIALIZED);
    });
  });




  describe('install', () => {
    test('initializes the environment in case it hadn\'t been', () => {
      createDirectory(SRC);
      executeAction(a({ src: SRC, development: 'true' }));
      expect(rf('environment')).toBe(buildEnvironment(false));
    });

    test('can install any environment', () => {
      createDirectory(SRC);
      executeAction(a({ src: SRC, init: 'true' }));
      expect(rf('environment')).toBe(buildEnvironment(false));
      executeAction(a({ src: SRC, production: 'true' }));
      expect(rf('environment')).toBe(buildEnvironment(true));
      executeAction(a({ src: SRC, staging: 'true' }));
      expect(rf('environment')).toBe(buildEnvironment(false));
    });
  });
});
