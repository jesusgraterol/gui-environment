import { describe, beforeAll, afterAll, beforeEach, afterEach, test, expect } from 'vitest';
import {
  ENVIRONMENT_BASE_FILE_NAME,
  ENVIRONMENT_DIR_NAME,
  ENVIRONMENT_FILE_EXT,
  buildEnvironmentPath,
  buildFilePath,
} from './utils.js';


/* ************************************************************************************************
 *                                              TESTS                                             *
 ************************************************************************************************ */

describe('buildEnvironmentPath', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can build the base directory path', () => {
    expect(buildEnvironmentPath('src')).toBe(`src/${ENVIRONMENT_DIR_NAME}`);
    expect(buildEnvironmentPath('./src')).toBe(`src/${ENVIRONMENT_DIR_NAME}`);
  });

  test('can build the path for an environment file', () => {
    expect(buildEnvironmentPath('src', 'index.ts')).toBe(`src/${ENVIRONMENT_DIR_NAME}/index.ts`);
    expect(buildEnvironmentPath('./src', 'index.ts')).toBe(`src/${ENVIRONMENT_DIR_NAME}/index.ts`);
    expect(buildEnvironmentPath('src', 'environment.development.ts')).toBe(`src/${ENVIRONMENT_DIR_NAME}/environment.development.ts`);
    expect(buildEnvironmentPath('./src', 'environment.production.ts')).toBe(`src/${ENVIRONMENT_DIR_NAME}/environment.production.ts`);
  });
});





describe('buildFilePath', () => {
  test('can build the path for the types file', () => {
    expect(buildFilePath('source', 'types')).toBe(`source/${ENVIRONMENT_BASE_FILE_NAME}/types${ENVIRONMENT_FILE_EXT}`);
  });
  test('can build the path for the index file', () => {
    expect(buildFilePath('source', 'index')).toBe(`source/${ENVIRONMENT_BASE_FILE_NAME}/index${ENVIRONMENT_FILE_EXT}`);
  });
  test('can build the path for the environment (output) file', () => {
    expect(buildFilePath('source', 'environment')).toBe(`source/${ENVIRONMENT_BASE_FILE_NAME}/environment${ENVIRONMENT_FILE_EXT}`);
  });
  test('can build the path for the environment name files', () => {
    expect(buildFilePath('source', 'development')).toBe(`source/${ENVIRONMENT_BASE_FILE_NAME}/environment.development${ENVIRONMENT_FILE_EXT}`);
    expect(buildFilePath('source', 'staging')).toBe(`source/${ENVIRONMENT_BASE_FILE_NAME}/environment.staging${ENVIRONMENT_FILE_EXT}`);
    expect(buildFilePath('source', 'production')).toBe(`source/${ENVIRONMENT_BASE_FILE_NAME}/environment.production${ENVIRONMENT_FILE_EXT}`);
  });
});
