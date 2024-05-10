import { describe, beforeAll, afterAll, beforeEach, afterEach, test, expect } from 'vitest';
import { ENVIRONMENT_DIR_NAME, buildEnvironmentPath } from './environment.utils.js';


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
