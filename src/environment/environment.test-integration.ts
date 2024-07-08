import { describe, beforeAll, afterAll, beforeEach, afterEach, test, expect } from 'vitest';
import { createDirectory, deleteDirectory, readTextFile } from 'fs-utils-sync';
import { IEnvironmentName, IModuleArgs, ENVIRONMENT_NAMES, ERRORS } from '../shared/index.js';
import { buildFilePath, getGUIVersion } from '../utils/index.js';
import { buildEnvironment, buildTypes } from '../templates/index.js';
import { executeAction } from './environment.js';

/* ************************************************************************************************
 *                                           CONSTANTS                                            *
 ************************************************************************************************ */

// the path to the test src directory
const SRC = 'src-test';

// the current version of the GUI
const version = getGUIVersion();





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

// builds an environment in string format
const be = (production: boolean): string => buildEnvironment(production).replace(
  'version: \'(package.json).version\'',
  `version: '${version}'`,
);





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
      expect(rf('types')).toBe(buildTypes());
      ENVIRONMENT_NAMES.forEach((n) => expect(rf(n)).toBe(buildEnvironment(n === 'production')));
      expect(rf('environment')).toBe(be(false));
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
      expect(rf('environment')).toBe(be(false));
    });

    test('can install any environment', () => {
      createDirectory(SRC);
      executeAction(a({ src: SRC, init: 'true' }));
      expect(rf('environment')).toBe(be(false));
      executeAction(a({ src: SRC, production: 'true' }));
      expect(rf('environment')).toBe(be(true));
      executeAction(a({ src: SRC, staging: 'true' }));
      expect(rf('environment')).toBe(be(false));
    });
  });
});
