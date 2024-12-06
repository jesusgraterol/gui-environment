import { describe, beforeAll, afterAll, beforeEach, afterEach, test, expect, vi } from 'vitest';
import { isDirectory } from 'fs-utils-sync';
import { ERRORS } from '../shared/errors.js';
import { buildEnvironmentPath } from '../utils/index.js';
import { validateSourcePath, canEnvironmentBeInitialized } from './index.js';

/* ************************************************************************************************
 *                                             MOCKS                                              *
 ************************************************************************************************ */

// fs-utils-sync package
vi.mock('fs-utils-sync', () => ({
  isDirectory: vi.fn(),
}));





/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('validateSourcePath', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('throws if an invalid srcPath is provided', () => {
    expect(() => validateSourcePath('')).toThrowError(ERRORS.INVALID_PATH);
    // @ts-ignore
    expect(() => validateSourcePath()).toThrowError(ERRORS.INVALID_PATH);
    // @ts-ignore
    expect(() => validateSourcePath(null)).toThrowError(ERRORS.INVALID_PATH);
  });

  test('throws if the srcPath is not a directory', () => {
    // @ts-ignore
    isDirectory.mockReturnValue(false);
    expect(() => validateSourcePath('someSrcPath')).toThrowError(ERRORS.NOT_A_DIRECTORY);
  });

  test('the validation passes if the srcPath exists', () => {
    // @ts-ignore
    isDirectory.mockReturnValue(true);
    expect(() => validateSourcePath('someSrcPath')).not.toThrowError();
  });
});





describe('canEnvironmentBeInitialized', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('throws if the environment\'s base directory exists', () => {
    // @ts-ignore
    isDirectory.mockReturnValue(true);
    expect(
      () => canEnvironmentBeInitialized(buildEnvironmentPath('src')),
    ).toThrowError(ERRORS.ENVIRONMENT_ALREADY_INITIALIZED);
  });

  test('passes the validation if the environment directory has not yet been init', () => {
    // @ts-ignore
    isDirectory.mockReturnValue(false);
    expect(
      () => canEnvironmentBeInitialized(buildEnvironmentPath('src')),
    ).not.toThrowError();
  });
});
