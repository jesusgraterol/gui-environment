import { describe, test, expect } from 'vitest';
import { buildEnvironment } from './index.js';

describe('buildEnvironment', () => {
  test('can generate the template for environment file for development, staging and production', () => {
    expect(buildEnvironment(false)).toContain('production: false');
    expect(buildEnvironment(true)).toContain('production: true');
  });
});
