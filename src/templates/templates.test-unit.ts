import { describe, beforeAll, afterAll, beforeEach, afterEach, test, expect } from 'vitest';
import { buildEnvironment } from './templates.js';

describe('buildEnvironment', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can generate the template for environment file for development, staging and production', () => {
    expect(buildEnvironment(false)).toContain('production: false');
    expect(buildEnvironment(true)).toContain('production: true');
  });
});
