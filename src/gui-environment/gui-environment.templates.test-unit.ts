import Templates from './gui-environment.templates.js';

describe('Template Builders', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => { });

  test('can generate the template for environment file for both, development and production', () => {
    expect(Templates.buildEnvironment(false)).toContain('production: false');
    expect(Templates.buildEnvironment(true)).toContain('production: true');
  });
});
